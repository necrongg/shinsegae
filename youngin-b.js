//youngin-b.js

// STRR_ID : 화주
// ITEM_GCD : 품목그룹
// OUTB_TCD : 출고유형
// OUTB_WH : 배송센터
// CUST_CD : 배송처코드
// SHIPTO_ID : 배송처
// SHIPTO_TCD : 물류관리부서
// OUTB_ECT_DATE : 출고일자
// EMART_CENTER_RCV_DATE : 이마트 센터 입고일

// 용인 지하
function startFreezeObserver() {
    const freezeObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            const headerTitle = document.querySelector("#SEARCH_CONDITION_header-title");

            if (headerTitle) {
                createButtonContainer(headerTitle);
                const container = document.querySelector(".custom-button-container");

                // 하티 상온
                createButton(container, '하티 상온', '하티상온', 'black', 'gold', () => {
                    setElementValue('[name*="ITEM_GCD"]', 'A067');
                });

                // 하티 냉동
                createButton(container, '하티 냉동', '하티냉동', 'black', 'gold', () => {
                    setElementValue('[name*="ITEM_GCD"]', 'A068');
                });

                // 하티
                createButton(container, '하티', '하티', 'black', 'gold', () => {
                    setElementValue('[name*="ITEM_GCD"]', 'A067,A068');
                });

                // 비알 상온
                createButton(container, '비알 상온', '비알상온', 'gold', 'black', () => {
                    setElementValue('[name*="ITEM_GCD"]', 'A062');
                });

                // 비알 냉동
                createButton(container, '비알 냉동', '비알냉동', 'gold', 'black', () => {
                    setElementValue('[name*="ITEM_GCD"]', 'A063,A064,A065');
                });

                // 비알
                createButton(container, '비알', '비알', 'gold', 'black', () => {
                    setElementValue('[name*="ITEM_GCD"]', 'A062,A063,A064,A065');
                });


                freezeObserver.disconnect();  // observer 즉시 종료
                break;  // 루프 탈출
            }
        }
    });
    freezeObserver.observe(document.body, {childList: true, subtree: true});
}

window.startFreezeObserver = startFreezeObserver;

// 최초 실행
startFreezeObserver();