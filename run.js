// ==UserScript==
// @name         신세계wms 추가 기능
// @namespace    https://slp-new.shinsegaefood.com/*
// @version      2025-04-21
// @description  신세계wms 간편 버튼 생성기
// @author       You
// @match        https://slp-new.shinsegaefood.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinsegaefood.com
// @grant        unsafeWindow
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const baseUrl = 'https://raw.githubusercontent.com/necrongg/shinsegae/refs/heads/main/';

    const savedScripts = localStorage.getItem('wmsScriptSet');
    const defaultScripts = ['css.css', 'commonSettings.js'];

    const scriptsToLoad = savedScripts ? JSON.parse(savedScripts) : defaultScripts;

    function loadScriptSequentially(scripts, index = 0) {
        if (index >= scripts.length) return;

        const scriptUrl = proxyUrl + encodeURIComponent(baseUrl + scripts[index]);

        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.async = false;
        script.onload = () => {
            console.log(`✅ [${scripts[index]}] 로드 완료`);
            loadScriptSequentially(scripts, index + 1);
        };
        script.onerror = (e) => {
            console.error(`❌ [${scripts[index]}] 로드 실패:`, e);
        };

        document.head.appendChild(script);
    }

    loadScriptSequentially(scriptsToLoad);
})();
