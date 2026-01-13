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

        const headerTitle = document.querySelector("#SEARCH_CONDITION_header-title");
        const titleEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");

        // 제목이 '사전 재고보충'인지 확인하고, 해당 조건에 맞는 SHIPTO_TCD 값을 설정
        const shipToTcdValue = (titleEl && titleEl.textContent.includes("사전 재고보충")) ? '30' : '20';

        if (headerTitle) {
            createButtonContainer(headerTitle);
            const container = document.querySelector(".custom-button-container");

            // 세린+CK 세팅
            createButton(container, '세린+CK', '세+C', ' white', 'red', () => {
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
            createButton(container, 'CK', 'CK', 'white', 'green', () => {
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
            createButton(container, '세린', '세린', 'black', 'yellow', () => {
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
            createButton(container, 'CK냉장', 'CK냉장', 'white', 'blue', () => {
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
            createButton(container, '현대삼성', '현대삼성', 'black', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A012,A005,A028,A046,A059,A007,A033,A008,A057',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: shipToTcdValue,
                    OUTB_TCD: '',
                    OUTB_WH: ''

                });
            });

            // 이마트중계 세팅
            createButton(container, '이마트 중계', '중계', 'white', 'black', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A028,A043,A046',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: ''

                });
            });

            // 축산 세린 ck 세팅
            createButton(container, '축산+세린+CK', '축C세', 'black', 'pink', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047,A005,A012,A058,A059,A057,A061,A066,A043,A028,A046,A055',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: ''

                });
            });

            // 아워홈 경인
            createButton(container, '아워홈 경인', '아.경인', 'black', 'white', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: '',
                    CUST_CD: '8858501,8858601,8858701,8858801,8858901,8859001',
                    SHIPTO_ID: '8858501,8858601,8858701,8858801,8858901,8859001',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 아워홈 지방
            createButton(container, '아워홈 지방', '아.지방', 'black', 'white', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: '',
                    CUST_CD: '8859101,8859201,8859301',
                    SHIPTO_ID: '8859101,8859201,8859301',
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
observer.observe(document.body, {childList: true, subtree: true});