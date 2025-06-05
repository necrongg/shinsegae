// ==UserScript==
// @name         신세계wms 추가 기능
// @namespace    https://slp-new.shinsegaefood.com/*
// @version      2025-05-27
// @description  신세계wms 간편 버튼 생성기
// @author       You
// @match        https://slp-new.shinsegaefood.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinsegaefood.com
// @grant        unsafeWindow
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const baseUrl = 'https://raw.githubusercontent.com/necrongg/shinsegae/refs/heads/main/';

    const savedScripts = localStorage.getItem('wmsScriptSet');
    const defaultScripts = ['css.css', 'commonSettings.js'];
    const scriptsToLoad = savedScripts ? JSON.parse(savedScripts) : defaultScripts;

    async function loadNext(index = 0) {
        if (index >= scriptsToLoad.length) return;

        const file = scriptsToLoad[index];
        const fullUrl = proxyUrl + encodeURIComponent(baseUrl + file);

        if (file.endsWith('.js')) {
            // JS 파일은 기존 방식 유지
            const script = document.createElement('script');
            script.src = fullUrl;
            script.type = 'text/javascript';
            script.async = false;
            script.onload = () => {
                console.log(`✅ [${file}] 로드 완료`);
                loadNext(index + 1);
            };
            script.onerror = (e) => {
                console.error(`❌ [${file}] 로드 실패:`, e);
            };
            document.head.appendChild(script);
        } else if (file.endsWith('.css')) {
            // CSS 파일은 Data URL로 강제 변환
            try {
                const response = await fetch(fullUrl);
                const cssText = await response.text();
                const dataUrl = `data:text/css;charset=utf-8,${encodeURIComponent(cssText)}`;

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = dataUrl;
                link.onload = () => {
                    console.log(`✅ [${file}] 스타일 로드 완료`);
                    loadNext(index + 1);
                };
                link.onerror = (e) => {
                    console.error(`❌ [${file}] 스타일 로드 실패:`, e);
                };
                document.head.appendChild(link);
            } catch (e) {
                console.error(`❌ [${file}] fetch 실패:`, e);
                loadNext(index + 1);
            }
        } else {
            console.warn(`⚠️ 알 수 없는 확장자: ${file}`);
            loadNext(index + 1);
        }
    }

    loadNext();
})();
