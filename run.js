// ==UserScript==
// @name         신세계wms 추가 기능 (직통+캐시+버전체크+ETag정규화+조건부GET+TTL)
// @namespace    https://slp-new.shinsegaefood.com/*
// @version      2025-08-08
// @description  GitHub Raw 직통 + 캐시 + 버전체크 + ETag 정규화 + 조건부 GET + TTL 보완
// @author       You
// @match        https://slp-new.shinsegaefood.com/*
// @grant        unsafeWindow
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    const baseUrl = 'https://raw.githubusercontent.com/necrongg/shinsegae/refs/heads/main/';
    const savedScripts = localStorage.getItem('wmsScriptSet');
    const defaultScripts = ['css.css', 'commonSettings.js'];
    const scriptsToLoad = savedScripts ? JSON.parse(savedScripts) : defaultScripts;

    // TTL: ETag가 없을 때는 이 시간 내 재요청 생략 (1시간)
    const CACHE_TTL = 1000 * 60 * 60;

    // 안전한 ID 문자열 생성
    function idSafe(name) {
        return 'wms_' + name.replace(/[^a-z0-9\-_]/gi, '_');
    }

    // 🔹 ETag 정규화 함수
    function normalizeETag(etag) {
        return etag ? etag.replace(/^W\//, '').replace(/"/g, '').trim() : null;
    }

    // 🔹 조건부 GET 시도: If-None-Match 사용 (cachedETag는 normalized 상태)
    async function conditionalGet(file, cachedETag) {
        try {
            const headers = {};
            // If-None-Match는 서버가 원래 사용한 형태(따옴표 포함)로 보내는 것이 안전
            if (cachedETag) headers['If-None-Match'] = `"${cachedETag}"`;
            const res = await fetch(baseUrl + file, { method: 'GET', cache: 'no-store', headers, mode: 'cors' });

            if (res.status === 304) {
                // 304: 변경 없음 (서버는 바디를 안 보내므로 빠름)
                const newE = normalizeETag(res.headers.get('etag'));
                return { notModified: true, text: null, etag: newE };
            }

            if (res.ok) {
                const text = await res.text();
                const newE = normalizeETag(res.headers.get('etag'));
                return { notModified: false, text, etag: newE };
            }

            // 실패
            console.warn(`[${file}] conditionalGet 실패 status=${res.status}`);
            return { error: true };
        } catch (err) {
            console.warn(`[${file}] conditionalGet 예외`, err);
            return { error: true };
        }
    }

    // 🔹 HEAD로 ETag 가져오기 (보조 수단)
    async function getETagHead(file) {
        try {
            const res = await fetch(baseUrl + file, { method: 'HEAD', cache: 'no-cache', mode: 'cors' });
            return normalizeETag(res.headers.get('etag'));
        } catch (e) {
            console.warn(`⚠️ [${file}] HEAD ETag 가져오기 실패`, e);
            return null;
        }
    }

    // 🔹 파일 다운로드 & 캐시 저장 (full fetch)
    async function fetchAndCache(file, providedETag = null) {
        try {
            const res = await fetch(baseUrl + file, { cache: 'no-store', mode: 'cors' });
            if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
            const text = await res.text();
            const etagFromRes = normalizeETag(res.headers.get('etag')) || providedETag || null;

            localStorage.setItem(`wmsCache_${file}`, text);
            if (etagFromRes) localStorage.setItem(`wmsCacheETag_${file}`, etagFromRes);
            localStorage.setItem(`wmsCacheTime_${file}`, Date.now().toString());

            console.log(`✅ [${file}] 최신버전 저장 완료 (etag:${etagFromRes})`);
            return { text, etag: etagFromRes };
        } catch (e) {
            console.error(`❌ [${file}] 다운로드 실패`, e);
            return null;
        }
    }

    // 🔹 파일 로드 (통합 로직)
    async function loadFile(file) {
        const cachedData = localStorage.getItem(`wmsCache_${file}`);
        const cachedETag = localStorage.getItem(`wmsCacheETag_${file}`);
        const cachedTime = parseInt(localStorage.getItem(`wmsCacheTime_${file}`) || '0', 10);

        // 캐시 있으면 즉시 적용 (사용자 체감 속도 개선)
        if (cachedData) {
            console.log(`⚡ [${file}] 캐시 적용 (즉시)`);
            applyFile(file, cachedData);
        }

        // 1) 케이스: cachedETag 존재 → 조건부 GET 시도 (If-None-Match)
        if (cachedETag) {
            const cond = await conditionalGet(file, cachedETag);
            if (cond.error) {
                console.log(`[${file}] 조건부 GET 실패 → HEAD로 ETag 재확인 시도`);
                // 실패 시 보조 HEAD 시도
                const headE = await getETagHead(file);
                if (headE && headE === cachedETag) {
                    console.log(`⚡ [${file}] HEAD 상 ETag 동일 -> 업데이트 불필요`);
                    return;
                }
                // HEAD 불가하면 풀 다운로드 시도
                const fetched = await fetchAndCache(file);
                if (fetched && fetched.text !== cachedData) applyFile(file, fetched.text);
                return;
            }

            if (cond.notModified) {
                console.log(`🔒 [${file}] 서버 응답 304 Not Modified -> 다운로드 생략`);
                // 304가 오면 ETag가 바뀌었을 수도 있음(드물게). 헤더가 있으면 저장
                if (cond.etag) {
                    localStorage.setItem(`wmsCacheETag_${file}`, cond.etag);
                }
                localStorage.setItem(`wmsCacheTime_${file}`, Date.now().toString());
                return;
            }

            // cond.text 존재하면 서버가 새 바디를 보냈음 (200)
            if (cond.text !== undefined && cond.text !== null) {
                // 내용이 실제로 바뀌었을때만 적용
                if (cond.text !== cachedData) {
                    console.log(`🔄 [${file}] 서버에 새 내용 있음 -> 적용`);
                    localStorage.setItem(`wmsCache_${file}`, cond.text);
                    if (cond.etag) localStorage.setItem(`wmsCacheETag_${file}`, cond.etag);
                    localStorage.setItem(`wmsCacheTime_${file}`, Date.now().toString());
                    applyFile(file, cond.text);
                } else {
                    console.log(`⚡ [${file}] 서버에서 받아온 내용이 로컬과 동일 -> 적용 생략`);
                    localStorage.setItem(`wmsCacheTime_${file}`, Date.now().toString());
                }
                return;
            }
        }

        // 2) cachedETag가 없거나 조건부 GET이 불가한 경우
        // ETag가 아예 없는 환경이면 TTL 기준으로 재요청을 제어
        const now = Date.now();
        if (!cachedETag && cachedData && (now - cachedTime) < CACHE_TTL) {
            console.log(`⏳ [${file}] ETag 없음, TTL 내(약 ${Math.round((CACHE_TTL - (now - cachedTime))/1000)}s 남음) -> 다운로드 생략`);
            return;
        }

        // 최후: full fetch & 캐시
        console.log(`🌐 [${file}] full fetch 시도`);
        const fetched = await fetchAndCache(file);
        if (fetched && fetched.text !== cachedData) {
            applyFile(file, fetched.text);
        }
    }

    // 🔹 파일 적용 (중복 방지 : CSS는 id로 덮어쓰기)
    function applyFile(file, text) {
        if (file.endsWith('.js')) {
            // JS: 기존 실행된 스크립트와 동일 내용이면 재삽입 생략(외부에서 이미 체크)
            const script = document.createElement('script');
            // 안전하게 파일명 기반 id 부여(참고용, 동일 파일 여러번 로드 방지 로그용)
            const scriptId = idSafe('js_' + file);
            script.id = scriptId + '_' + Date.now(); // 재실행 가능하도록 timestamp
            script.textContent = text;
            document.head.appendChild(script);
            console.log(`▶️ [${file}] JS 실행`);
        } else if (file.endsWith('.css')) {
            const styleId = idSafe('css_' + file);
            let styleEl = document.getElementById(styleId);
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = styleId;
                document.head.appendChild(styleEl);
            }
            styleEl.textContent = text;
            console.log(`🎨 [${file}] CSS 적용 (id:${styleId})`);
        } else {
            console.warn(`⚠️ 알 수 없는 확장자: ${file}`);
        }
    }

    // 🔹 실행
    (async function init() {
        for (let file of scriptsToLoad) {
            try {
                await loadFile(file);
            } catch (e) {
                console.error(`[${file}] 처리 중 예외`, e);
            }
        }
    })();

})();
