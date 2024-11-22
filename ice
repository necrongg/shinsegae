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
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ물류대행 세팅ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 새로운 div 컨테이너 생성
                const thd3plDiv = document.createElement('div');
                thd3plDiv.style.position = 'absolute';
                thd3plDiv.style.cursor = 'pointer';
                thd3plDiv.style.left = '1485px';
                thd3plDiv.classList.add('x-tool', 'x-box-item', 'x-tool-default', 'x-tool-after-title');

                // 내부 아이콘
                const thd3plChildDiv = document.createElement('div');
                thd3plChildDiv.classList.add('x-tool-tool-el');
                thd3plChildDiv.style.backgroundPosition = '0 -256px';
                thd3plChildDiv.style.background = 'URL(https://icons-for-free.com/iff/png/512/pizza-131982518891951236.png) no-repeat';
                thd3plChildDiv.style.backgroundSize = '16px 16px';
                thd3plChildDiv.title = '물류대행(미피,스무디킹)';

                // 클릭 이벤트
                thd3plDiv.addEventListener('click', function() {
                    const sTRR_ID_inputElement = document.querySelector('[name*="STRR_ID"]');
                    const iTEM_GCD_inputElement = document.querySelector('[name*="ITEM_GCD"]');
                    const sHIPTO_TCD_inputElement = document.querySelector('[name*="SHIPTO_TCD"]');
                    const dC_IOB_TYP_inputElement = document.querySelector('[name*="DC_IOB_TYP"]');
                    const oRDER_CNFM_YN_inputElement = document.querySelector('[name*="ORDER_CNFM_YN"]');
                    const oUTB_TCDN_inputElement = document.querySelector('[name*="OUTB_TCD"]');
                    const oUTB_WH_inputElement = document.querySelector('[name*="OUTB_WH"]');

                    //배송센터
                    if (oUTB_WH_inputElement) {
                        oUTB_WH_inputElement.value = '01114,01115,04736';
                    } else {
                        console.error('Input element with name* "OUTB_WH" not found.');
                    }

                    //출고유형
                    if (oUTB_TCDN_inputElement) {
                        oUTB_TCDN_inputElement.value = 'IOOBDCNMXXXX';
                    } else {
                        console.error('Input element with name* "OUTB_TCD" not found.');
                    }

                    //화주
                    if (sTRR_ID_inputElement) {
                        sTRR_ID_inputElement.value = '0100037,0037396';
                    } else {
                        console.error('Input element with name* "STRR_ID" not found.');
                    }

                    //주문확정여부
                    if (oRDER_CNFM_YN_inputElement) {
                        oRDER_CNFM_YN_inputElement.value = '';
                    } else {
                        console.error('Input element with name* "ORDER_CNFM_YN" not found.');
                    }

                    // 품목그룹
                    if (iTEM_GCD_inputElement) {
                        iTEM_GCD_inputElement.value = 'A003,A004,A007,A013,A039,A41,A42,A044,A045,A047,A051';
                    } else {
                        console.error('Input element with name* "ITEM_GCD" not found.');
                    }

                    // 물류관리코드
                    if (sHIPTO_TCD_inputElement) {
                        sHIPTO_TCD_inputElement.value = '20';
                    } else {
                        console.error('Input element with name* "SHIPTO_TCD" not found.');
                    }

                    // DC입출고유형
                    if (dC_IOB_TYP_inputElement) {
                        dC_IOB_TYP_inputElement.value = 'DC출고';
                    } else {
                        console.error('Input element with name* "DC_IOB_TYP" not found.');
                    }

                });

                // 생성한 div를 target 요소에 추가합니다.
                targetEl.appendChild(thd3plDiv);
                thd3plDiv.appendChild(thd3plChildDiv);
                //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ물류대행 세팅(끝)ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

                //https://icons-for-free.com/iff/png/512/pizza-131982518891951236.png 피자픽셀 이미지

                // observer 중지
                observer.disconnect();
            }
        });
    });

    // 감시할 대상 노드와 옵션 설정
    observer.observe(document.body, {
        childList: true
    });
})();
