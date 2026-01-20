//rt.js

// STRR_ID : 화주
// ITEM_GCD : 품목그룹
// OUTB_TCD : 출고유형
// OUTB_WH : 배송센터
// CUST_CD : 배송처코드
// SHIPTO_ID : 배송처
// SHIPTO_TCD : 물류관리부서
// OUTB_ECT_DATE : 출고일자
// EMART_CENTER_RCV_DATE : 이마트 센터 입고일

// 상온냉장
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {  // forEach 대신 for...of 사용
        console.log("DOM변경_수정본");

        const headerTitle = document.querySelector("#SEARCH_CONDITION_header-title");

        if (headerTitle) {
            createButtonContainer(headerTitle);
            const container = document.querySelector(".custom-button-container");

            // 품목그룹 추가(상온)
            createButton(container,  '품목그룹(상온)', '품목','black', 'gold', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A003,A008,A048,A006,A002,A024,A023,A054,A034,A017,A016');
            });

            // 미스터피자-경인 세팅
            createButton(container, '미스터피자-경인', '🍕경인','white', 'chocolate', () => {
                setElementsValues({
                    STRR_ID: '0100037',
                    ITEM_GCD: 'A006,A008',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 미스터피자-지방 세팅
            createButton(container,  '미스터피자-지방', '🍕지방','white', 'chocolate', () => {
                setElementsValues({
                    STRR_ID: '0100037',
                    ITEM_GCD: 'A006,A008',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 경인 세팅
            createButton(container, '경인', '경인','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A008,A048,A006,A002,A43,A30,A024,A014,A030,A003',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 지방 세팅
            createButton(container, '지방', '지방','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A023,A008,A048,A006,A002,A43,A30,A024,A014,A030,A003',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 주스 세팅
            createButton(container, '주스', '주스','white', 'deeppink', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: '',
                    ITEM_CD:'229914,241364,241365,318734,318735,318713,333149,342695,342696',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 양곡 세팅
            createButton(container, '양곡', '양곡','white', 'darkolivegreen', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A023',
                    ITEM_CD:'',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 이마트 세팅
            createButton(container, '이마트', '이마트','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A023,A008,A048,A006,A002,A43,A30,A024,A014,A030,A054,A003',
                    ITEM_CD:'',
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
observer.observe(document.body, { childList: true, subtree: true });