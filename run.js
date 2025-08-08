// ==UserScript==
// @name         신세계wms 추가 기능 (직통+캐시+버전체크+TTL만)
// @namespace    https://slp-new.shinsegaefood.com/*
// @version      2025-08-08
// @description  GitHub Raw 직통 + 캐시 + 버전체크 + ETag 제거, TTL 기준 캐시 관리
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

    // TTL: 캐시 재요청 간격 (10분)
    const CACHE_TTL = 1000 * 60 * 10;

    // 안전한 ID 문자열 생성
    function idSafe(name) {
        return 'wms_' + name.replace(/[^a-z0-9\-_]/gi, '_');
    }

    // 파일 다운로드 & 캐시 저장 (full fetch)
    async function fetchAndCache(file) {
        try {
            const res = await fetch(baseUrl + file, { cache: 'no-store', mode: 'cors' });
            if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
            const text = await res.text();

            localStorage.setItem(`wmsCache_${file}`, text);
            localStorage.setItem(`wmsCacheTime_${file}`, Date.now().toString());

            console.log(`✅ [${file}] 최신버전 저장 완료`);
            return { text };
        } catch (e) {
            console.error(`❌ [${file}] 다운로드 실패`, e);
            return null;
        }
    }

    // 파일 적용 (JS, CSS)
    function applyFile(file, text) {
        if (file.endsWith('.js')) {
            const script = document.createElement('script');
            const scriptId = idSafe('js_' + file);
            script.id = scriptId + '_' + Date.now();
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
            console.log(`🎨 [${file}] CSS 적용`);
        } else {
            console.warn(`⚠️ 알 수 없는 확장자: ${file}`);
        }
    }

    // 파일 로드 (TTL 기반 캐시 사용)
    async function loadFile(file) {
        const cachedData = localStorage.getItem(`wmsCache_${file}`);
        const cachedTime = parseInt(localStorage.getItem(`wmsCacheTime_${file}`) || '0', 10);
        const now = Date.now();

        // 캐시 있으면 즉시 적용
        if (cachedData) {
            console.log(`⚡ [${file}] 캐시 적용 (즉시)`);
            applyFile(file, cachedData);
        }

        // TTL 내면 재요청 생략
        if (cachedData && (now - cachedTime) < CACHE_TTL) {
            console.log(`⏳ [${file}] TTL 내(약 ${Math.round((CACHE_TTL - (now - cachedTime))/1000)}초 남음) → 다운로드 생략`);
            return;
        }

        // TTL 지났으면 서버에서 다시 다운로드 후 적용
        console.log(`🌐 [${file}] TTL 만료 또는 캐시 없음, 서버에서 다운로드`);
        const fetched = await fetchAndCache(file);
        if (fetched && fetched.text !== cachedData) {
            applyFile(file, fetched.text);
        }
    }

    // 실행
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
