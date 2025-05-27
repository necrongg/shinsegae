//ck.js

// STRR_ID : 화주
// ITEM_GCD : 품목그룹
// OUTB_TCD : 출고유형
// OUTB_WH : 배송센터
// CUST_CD : 배송처코드
// SHIPTO_ID : 배송처
// SHIPTO_TCD : 물류관리부서
// OUTB_ECT_DATE : 출고일자
// EMART_CENTER_RCV_DATE : 이마트 센터 입고일
// 시작위치 : 1490px 다음 -47px

// 음성ck
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {  // forEach 대신 for...of 사용
        console.log("DOM변경_수정본");

        const targetEl = document.querySelector("#SEARCH_CONDITION_header-targetEl");
        const titleEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");

        // '임박재고현황' 화면이 열릴 때 자동으로 값 세팅 및 클릭
        if (titleEl && titleEl.textContent.trim().includes("임박재고현황")) {
            const button = document.getElementById("commonGrid-1033Button0");
            setElementsValues({
                STRR_ID: '',
                ITEM_GCD: 'A005,A012,A058,A059,A057,A061,A066,A043,A028,A046,A055',
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

        // 제목이 '사전 재고보충'인지 확인하고, 해당 조건에 맞는 SHIPTO_TCD 값을 설정
        const shipToTcdValue = (titleEl && titleEl.textContent.includes("사전 재고보충")) ? '30' : '20';

        if (targetEl) {
            // 세린+CK 세팅
            createButton(targetEl, '1490px', '세린+CK', '세+C',' white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A066,A005,A012,A058,A059,A057,A061,A043,A028,A046,A055',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: shipToTcdValue,
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // CK 세팅
            createButton(targetEl, '1443px', 'CK', 'CK','white', 'green', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A005,A012,A058,A059,A057,A061,A066',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 세린 세팅
            createButton(targetEl, '1396px', '세린', '세린','black', 'yellow', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A043,A028,A046,A055',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // CK냉장 세팅
            createButton(targetEl, '1349px', 'CK냉장', 'CK냉장','white', 'blue', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A005,A055,A057,A058',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 현대삼성 세팅
            createButton(targetEl, '1302px', '현대삼성', '현대','black', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A012,A005,A028,A046,A059,A007,A033,A008',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: shipToTcdValue,
                    OUTB_TCD: '',
                    OUTB_WH: ''

                });
            });

             // 이마트중계 세팅
                createButton(targetEl, '1255px', '이마트 중계', '중계','white', 'black', () => {
                    setElementsValues({
                        STRR_ID: '',
                        ITEM_GCD: 'A028,A043,A046,A042',
                        CUST_CD: '',
                        SHIPTO_ID: '',
                        SHIPTO_TCD: '20',
                        OUTB_TCD: '',
                        OUTB_WH: ''

                    });
                });

            // 축산 세린 ck 세팅
            createButton(targetEl, '1208px', '축산+세린+CK', '축C세','black', 'pink', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047,A005,A012,A058,A059,A057,A061,A066,A043,A028,A046,A055',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''

                });
            });
            observer.disconnect();  // observer 즉시 종료
            break;  // 루프 탈출
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });