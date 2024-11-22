// ==UserScript==
// @name         냉동파트 추가 기능
// @namespace    https://slp-new.shinsegaefood.com/*
// @version      2024-11-22
// @description  try to take over the world!
// @author       You
// @match        https://slp-new.shinsegaefood.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinsegaefood.com
// @grant unsafeWindow
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // MutationObserver를 사용하여 DOM 변경 감지
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // 헤더 감지
            const targetEl = document.querySelector("#SEARCH_CONDITION_header-targetEl");
            console.log("DOM변경");

            if (targetEl) {
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ품목그룹 추가ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const item_gcdDiv = document.createElement('div');
                item_gcdDiv.style.position = 'absolute';
                item_gcdDiv.style.cursor = 'pointer';
                item_gcdDiv.style.left = '1512px';
                item_gcdDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const item_gcdChildDiv = document.createElement('div');
                item_gcdChildDiv.classList.add('x-tool-tool-el', 'x-tool-img');
                item_gcdChildDiv.style.backgroundPosition = '0 -256px';
                item_gcdChildDiv.style.backgroundColor = 'red';
                item_gcdChildDiv.title = '품목그룹 추가(냉동)';

                // 품목그룹 추가 클릭 이벤트
                item_gcdDiv.addEventListener('click', function() {
                    const inputElement = document.querySelector('[name*="ITEM_GCD"]');
                    if (inputElement) {
                        inputElement.value = 'A003,A004,A007,A013,A039,A41,A42,A044,A045,A047,A051';
                    } else {
                        console.error('Input element with name* "ITEM_GCD" not found.');
                    }
                });

                // 생성한 div를 target 요소에 추가합니다.
                targetEl.appendChild(item_gcdDiv);
                item_gcdDiv.appendChild(item_gcdChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ품목그룹 추가(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ물류대행 세팅(미피,스무디킹)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const thd3plDiv = document.createElement('div');
                thd3plDiv.style.position = 'absolute';
                thd3plDiv.style.cursor = 'pointer';
                thd3plDiv.style.left = '1485px';
                thd3plDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const thd3plChildDiv = document.createElement('div');
                thd3plChildDiv.classList.add('x-tool-tool-el');
                thd3plChildDiv.style.background = 'URL(https://icons-for-free.com/iff/png/512/pizza-131982518891951236.png) no-repeat';
                thd3plChildDiv.style.backgroundSize = '16px 16px';
                thd3plChildDiv.title = '물류대행(미피,스무디킹)';

                // 클릭 이벤트
                thd3plDiv.addEventListener('click', function() {
                    const elements = {
                        sTRR_ID: document.querySelector('[name*="STRR_ID"]'),
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                        dC_IOB_TYP: document.querySelector('[name*="DC_IOB_TYP"]'),
                        oRDER_CNFM_YN: document.querySelector('[name*="ORDER_CNFM_YN"]'),
                        oUTB_TCDN: document.querySelector('[name*="OUTB_TCD"]'),
                        oUTB_WH: document.querySelector('[name*="OUTB_WH"]')
                    };

                    const values = {
                        oUTB_WH: '01114,01115,04736',
                        oUTB_TCDN: 'IOOBDCNMXXXX',
                        sTRR_ID: '0100037,0037396',
                        oRDER_CNFM_YN: '',
                        iTEM_GCD: 'A007',
                        sHIPTO_TCD: '20',
                        dC_IOB_TYP: 'DC출고'
                    };

                    for (const [key, element] of Object.entries(elements)) {
                        if (element) {
                            element.value = values[key];
                        } else {
                            console.error(`Input element with name* "${key}" not found.`);
                        }
                    }
                });

                // 생성한 div를 target 요소에 추가합니다.
                targetEl.appendChild(thd3plDiv);
                thd3plDiv.appendChild(thd3plChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ물류대행 세팅(미피,스무디킹)(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ동원홈푸드 세팅ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const dongoneDiv = document.createElement('div');
                dongoneDiv.style.position = 'absolute';
                dongoneDiv.style.cursor = 'pointer';
                dongoneDiv.style.left = '1458px';
                dongoneDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const dongoneChildDiv = document.createElement('div');
                dongoneChildDiv.classList.add('x-tool-tool-el');
                dongoneChildDiv.style.background = 'URL(https://logo-resources.thevc.kr/organizations/200x200/381f9714b27d7dbd5017d3ca895060d6df7be57e8880641d5dd90b3a8e4a63fb_1658280708536923.jpg) no-repeat';
                dongoneChildDiv.style.backgroundSize = '16px 16px';
                dongoneChildDiv.title = '동원홈푸드';

                // 클릭 이벤트
                dongoneChildDiv.addEventListener('click', function() {
                    const elements = {
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                        oRDER_CNFM_YN: document.querySelector('[name*="ORDER_CNFM_YN"]'),
                        cUST_CD: document.querySelector('[name*="CUST_CD"]'),
                    };

                    const values = {
                        oRDER_CNFM_YN: '',
                        iTEM_GCD: 'A003,A004,A007,A013,A039,A41,A42,A044,A045,A047,A051',
                        sHIPTO_TCD: '20',
                        cUST_CD:'5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
                    };

                    for (const [key, element] of Object.entries(elements)) {
                        if (element) {
                            element.value = values[key];
                        } else {
                            console.error(`Input element with name* "${key}" not found.`);
                        }
                    }
                });

                // 생성한 div를 target 요소에 추가합니다.
                targetEl.appendChild(dongoneDiv);
                dongoneDiv.appendChild(dongoneChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ동원홈푸드 세팅(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                // observer 중지
                observer.disconnect();
            }
        });
    });

    // 감시할 대상 노드와 옵션 설정
    observer.observe(document.body, {childList: true});
})();
