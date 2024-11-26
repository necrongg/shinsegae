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
                        oUTB_TCDN: document.querySelector('[name*="OUTB_TCD"]'),
                        //oUTB_WH: document.querySelector('[name*="OUTB_WH"]')
                    };

                    const values = {
                        //oUTB_WH: '01114,01115,04736',
                        oUTB_TCDN: 'IOOBDCNMXXXX',
                        sTRR_ID: '0100037,0037396',
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
                        cUST_CD: document.querySelector('[name*="CUST_CD"]'),
                        sHIPTO_ID: document.querySelector('[name*="SHIPTO_ID"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A007,A013,A039,A41,A42,A044,A045,A047,A051',
                        sHIPTO_TCD: '20',
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
                foodyDiv.style.left = '1431px';
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
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                        cUST_CD: document.querySelector('[name*="CUST_CD"]'),
                        sHIPTO_ID: document.querySelector('[name*="SHIPTO_ID"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A007,A013,A039,A41,A42,A044,A045,A047,A051',
                        sHIPTO_TCD: '20',
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
                mBkDiv.style.left = '1405px'; //신규 추가시 앞 -26px
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
                        sHIPTO_TCD: document.querySelector('[name*="SHIPTO_TCD"]'),
                        sTRR_ID: document.querySelector('[name*="STRR_ID"]'),
                    };

                    const values = {
                        iTEM_GCD: 'A003,A004,A007,A013,A039,A41,A42,A044,A045,A047,A051',
                        sHIPTO_TCD: '20',
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

                // observer 중지
                observer.disconnect();
            }
            // ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ단축 버튼 생성(끝)


            // ■테스트 버튼 생성■

            // 이동탭 확인, 헤더감지
            const cellLotMoveHeader = document.querySelector("#cellLotMoveHeaderTopToolBar-innerCt");
            if (cellLotMoveHeader) {
                // 새로운 div 컨테이너 생성
                const moveAllBtn = document.createElement('div');
                moveAllBtn.style.position = 'absolute';
                moveAllBtn.style.cursor = 'pointer';
                moveAllBtn.style.left = '1265px';
                moveAllBtn.classList.add('x-btn','x-unselectable','x-box-item','x-toolbar-item','x-btn-default-toolbar-small');

                cellLotMoveHeader.appendChild(moveAllBtn);

                // 버튼 클릭 이벤트
                moveAllBtn.addEventListener('click', function() {
                    if (window.confirm("모든 수량을 이동하시겠습니까?")) {
                        let componentDiv = document.querySelector('[data-componentid="gridview-1117"]');
                        if (componentDiv) {
                            let tables = componentDiv.querySelectorAll('div > table');
                            console.log(`Table 요소의 개수: ${tables.length}`);
                        } else {
                            console.error('componentid 속성을 가진 div 요소를 찾을 수 없습니다.');
                        }

                        // gridview-1117-record-110부터 시작하는 모든 요소를 선택합니다.
                        let index = 110;
                        let cellLotMove_grid;
                        while ((cellLotMove_grid = document.querySelector(`#gridview-1117-record-${index}`)) !== null) {

                            let eA_QTY_TO_MOVE = cellLotMove_grid.querySelector('[data-columnid="EA_QTY_TO_MOVE"] > div');
                            let mOV_QTY = cellLotMove_grid.querySelector('[data-columnid="MOV_QTY"] > div');
                            let tO_WCELL_NO = cellLotMove_grid.querySelector('[data-columnid="TO_WCELL_NO"] > div');
                            let fIX_CELL_NO = cellLotMove_grid.querySelector('[data-columnid="FIX_CELL_NO"] > div');

                            if (eA_QTY_TO_MOVE && mOV_QTY && tO_WCELL_NO && fIX_CELL_NO) {
                                eA_QTY_TO_MOVE.textContent = mOV_QTY.textContent;
                                tO_WCELL_NO.textContent = fIX_CELL_NO.textContent;
                            } else {
                                console.error(`필요한 요소를 ${index}번째 항목에서 찾을 수 없습니다.`);
                            }
                            index++;
                        }
                    }
                });
            }

            // ■테스트 버튼 생성(끝)■
        });
    });

    // 감시할 대상 노드와 옵션 설정
    observer.observe(document.body, {childList: true});
})();
