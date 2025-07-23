//master.js

// STRR_ID : 화주
// ITEM_GCD : 품목그룹
// OUTB_TCD : 출고유형
// OUTB_WH : 배송센터
// CUST_CD : 배송처코드
// SHIPTO_ID : 배송처
// SHIPTO_TCD : 물류관리부서
// OUTB_ECT_DATE : 출고일자
// EMART_CENTER_RCV_DATE : 이마트 센터 입고일

// 관리자
function startMasterObserver() {
    const masterObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const headerTitle = document.querySelector("#SEARCH_CONDITION_header-title");
        const textEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");

        // '임박재고현황' 화면이 열릴 때 자동으로 값 세팅 및 클릭
                if (textEl && textEl.textContent.trim().includes("임박재고현황")) {
                    const button = document.getElementById("commonGrid-1033Button0");
                    setElementsValues({
                        STRR_ID: '',
                        ITEM_GCD: 'A008,A048,A006,A002,A024,A023,A054,A005,A012,A058,A059,A057,A061,A066,A043,A028,A046,A055,A42,A004,A013,A007,A047,A039,A041,A033',
                        CUST_CD: '',
                        SHIPTO_ID: '',
                        SHIPTO_TCD: '',
                        OUTB_TCD: '',
                        OUTB_WH: ''
                    });

                    if (button) {
                        setTimeout(() => {
                            button.click();
                            console.log("강제조회");
                        }, 3000);
                    }
                }

        if (headerTitle) {
            createButtonContainer(headerTitle);
            const container = document.querySelector(".custom-button-container");

            //품목그룹 (상온냉장)
            createButton(container, '품목그룹(상온+냉장)', '상온','white', 'orange', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A008,A048,A006,A002,A024,A023,A054');
            });

            // 품목그룹 (세린+CK)
            createButton(container, '품목그룹(세린+CK)', '세CK','black', 'white', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A005,A012,A058,A059,A057,A061,A066,A043,A028,A046,A055');
            });

            // 품목그룹 (축산)
            createButton(container, '품목그룹(냉동/축산)', '냉동','white', 'blue', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A42,A004,A013,A007,A047,A039,A041');
            });


            // 품목그룹 (베이커리)
            createButton(container, '현대/삼성', '현/삼','black', 'Goldenrod', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A012,A005,A028,A046,A059,A007,A033,A008,A006');
            });


            masterObserver.disconnect();  // observer 즉시 종료
            break;  // 루프 탈출
        }
    }
});
    masterObserver.observe(document.body, { childList: true, subtree: true });
}
window.startMasterObserver = startMasterObserver;

// 최초 실행
startMasterObserver();