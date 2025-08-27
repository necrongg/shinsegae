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
                setElementValue('[name*="ITEM_GCD"]', 'A008,A048,A006,A002,A024,A023,A054,A034,A017,A016');
            });

            // 동원홈푸드 세팅
            createButton(container,  '동원홈푸드', '동원','white', 'blue', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A008,A048,A006,A002,A024,A023,A054',
                    CUST_CD : '8469501,8469502,8469401,8469402',
                    SHIPTO_ID: '8469501,8469502,8469401,8469402',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 스무디-경인 세팅
            createButton(container,  '스무디킹-경인', '🥤경인','white', 'indigo', () => {
                setElementsValues({
                    STRR_ID: '0037396',
                    ITEM_GCD: 'A006',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 스무디-지방 세팅
            createButton(container, '스무디킹-지방', '🥤지방','white', 'indigo', () => {
                setElementsValues({
                    STRR_ID: '0037396',
                    ITEM_GCD: 'A006',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: '01114,01115,04736'
                });
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

            // MRO 세팅
            createButton(container,  'MRO', 'MRO','white', 'black', () => {
                setElementsValues({
                    STRR_ID: '0003893',
                    ITEM_GCD: 'A008,A048,A006,A002,A024,A023,A054',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 경인 세팅
            createButton(container, '경인', '경인','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A008,A048,A006,A002,A024',
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
                    ITEM_GCD: 'A008,A048,A006,A002,A024,A023',
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
                    ITEM_CD:'229914,241364,241365,318734,318735,318713,333149',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // MRO 세팅
            createButton(container, 'MRO', 'MRO','white', 'maroon', () => {
                setElementsValues({
                    STRR_ID: '0003893',
                    ITEM_GCD: '',
                    ITEM_CD:'',
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
                    ITEM_GCD: 'A008,A048,A006,A002,A024,A023,A054,A034,A017,A016',
                    ITEM_CD:'',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
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