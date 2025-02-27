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
            console.log("DOM변경");

            // ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ단축 버튼 생성
            // 헤더 감지
            const targetEl = document.querySelector("#SEARCH_CONDITION_header-targetEl");

            if (targetEl) {
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ품목그룹 추가ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const item_gcdDiv = document.createElement('div');
                item_gcdDiv.style.position = 'absolute';
                item_gcdDiv.style.cursor = 'pointer';
                item_gcdDiv.style.left = '1490px';
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
                        inputElement.value = 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047';
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
                thd3plDiv.style.left = '1464px';
                thd3plDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const thd3plChildDiv = document.createElement('div');
                thd3plChildDiv.classList.add('x-tool-tool-el');
                thd3plChildDiv.style.backgroundSize = '16px 16px';
                thd3plChildDiv.title = '물류대행(미피,스무디킹)';
                thd3plChildDiv.textContent="🍕";

                // 클릭 이벤트
                thd3plDiv.addEventListener('click', function() {
                    const elements = {
                        sTRR_ID: document.querySelector('[name*="STRR_ID"]'),
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                    };

                    const values = {
                        sTRR_ID: '0100037,0037396',
                        iTEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                        sHIPTO_TCD: '20',
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
                dongoneDiv.style.left = '1438px';
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
                        cUST_CD: document.querySelector('[name*="CUST_CD"]'),
                        sHIPTO_ID: document.querySelector('[name*="SHIPTO_ID"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                        cUST_CD:'5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
                        sHIPTO_ID:'5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
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

                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ푸디스트 세팅ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const foodyDiv = document.createElement('div');
                foodyDiv.style.position = 'absolute';
                foodyDiv.style.cursor = 'pointer';
                foodyDiv.style.left = '1412px';
                foodyDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const foodyDivChildDiv = document.createElement('div');
                foodyDivChildDiv.classList.add('x-tool-tool-el');
                foodyDivChildDiv.style.background = 'URL(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70bjyI5MQiET7vXjCXGQ7woiysYgQcQsxhA&s) no-repeat';
                foodyDivChildDiv.style.backgroundSize = '16px 16px';
                foodyDivChildDiv.title = '푸디스트';

                // 클릭 이벤트
                foodyDivChildDiv.addEventListener('click', function() {
                    const elements = {
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        cUST_CD: document.querySelector('[name*="CUST_CD"]'),
                        sHIPTO_ID: document.querySelector('[name*="SHIPTO_ID"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                        cUST_CD:'6984101,8077601,8218701,8218001',
                        sHIPTO_ID:'6984101,8077601,8218701,8218001',
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
                targetEl.appendChild(foodyDiv);
                foodyDiv.appendChild(foodyDivChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ푸디스트 세팅(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡMBK 세팅ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const mBkDiv = document.createElement('div');
                mBkDiv.style.position = 'absolute';
                mBkDiv.style.cursor = 'pointer';
                mBkDiv.style.left = '1379px'; //신규 추가시 앞 -26px
                mBkDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const mBkChildDiv = document.createElement('div');
                mBkChildDiv.classList.add('x-tool-tool-el');
                mBkChildDiv.style.backgroundColor = 'black';
                mBkChildDiv.style.backgroundSize = '16px 16px';
                mBkChildDiv.title = 'MBK 마켓빌더즈코리아';
                mBkChildDiv.textContent="M";

                // 클릭 이벤트
                mBkChildDiv.addEventListener('click', function() {
                    const elements = {
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        sTRR_ID: document.querySelector('[name*="STRR_ID"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                        cUST_CD:'0039656',
                        sTRR_ID: '0039656',
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
                targetEl.appendChild(mBkDiv);
                mBkDiv.appendChild(mBkChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡMBK 세팅(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ경인 세팅ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const cDiv = document.createElement('div');
                cDiv.style.position = 'absolute';
                cDiv.style.cursor = 'pointer';
                cDiv.style.left = '1353px'; //신규 추가시 앞 -26px
                cDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const cChildDiv = document.createElement('div');
                cChildDiv.classList.add('x-tool-tool-el');
                cChildDiv.style.backgroundColor = 'red';
                cChildDiv.style.backgroundSize = '16px 16px';
                cChildDiv.title = '경인';
                cChildDiv.textContent="경";

                // 클릭 이벤트
                cChildDiv.addEventListener('click', function() {
                    const elements = {
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                        oUTB_TCDN: document.querySelector('[name*="OUTB_TCD"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                        sHIPTO_TCD: '20',
                        oUTB_TCDN: 'IOOBDCNMXXXX',
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
                targetEl.appendChild(cDiv);
                cDiv.appendChild(cChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ경인 세팅(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ지방 세팅ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const jDiv = document.createElement('div');
                jDiv.style.position = 'absolute';
                jDiv.style.cursor = 'pointer';
                jDiv.style.left = '1327px'; //신규 추가시 앞 -26px
                jDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const jChildDiv = document.createElement('div');
                jChildDiv.classList.add('x-tool-tool-el');
                jChildDiv.style.backgroundColor = 'orange';
                jChildDiv.style.backgroundSize = '16px 16px';
                jChildDiv.title = '지방';
                jChildDiv.textContent="지";

                // 클릭 이벤트
                jChildDiv.addEventListener('click', function() {
                    const elements = {
                        iTEM_GCD: document.querySelector('[name*="ITEM_GCD"]'),
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                        oUTB_WH: document.querySelector('[name*="OUTB_WH"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                        sHIPTO_TCD: '20',
                        oUTB_WH:'01114,01115,04736',
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
                targetEl.appendChild(jDiv);
                jDiv.appendChild(jChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ지방 세팅(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                // observer 중지
                observer.disconnect();
            }
            // ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ단축 버튼 생성(끝)
        });
    });

    // 감시할 대상 노드와 옵션 설정
    observer.observe(document.body, {childList: true});
})();
