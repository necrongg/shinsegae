//bk.js

// STRR_ID : 화주
// ITEM_CD : 품목코드
// ITEM_GCD : 품목그룹
// OUTB_TCD : 출고유형
// OUTB_WH : 배송센터
// CUST_CD : 배송처코드
// SHIPTO_ID : 배송처
// SHIPTO_TCD : 물류관리부서
// OUTB_ECT_DATE : 출고일자
// EMART_CENTER_RCV_DATE : 이마트 센터 입고일

// 베이커리
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {  // forEach 대신 for...of 사용
        console.log("DOM변경_수정본");

        const headerTitle = document.querySelector("#SEARCH_CONDITION_header-title");

        if (headerTitle) {
            createButtonContainer(headerTitle);
            const container = document.querySelector(".custom-button-container");

            // 소터1
            createButton(container,  '소터1', '소터1','white', 'blue', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '255132,335484',
                    ITEM_GCD: '',
                    CUST_CD : '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '130,135',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 소터2
            createButton(container, '소터2', '소터2','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A021',
                    CUST_CD : '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '135',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 식재 세팅
            createButton(container,  '식재', '식재','white', 'indigo', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '10',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 복합 세팅
            createButton(container,  '복합', '복합','white', 'indigo', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '130,135',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 천안직납 세팅
            createButton(container,  '천안 직납', '직납','black', 'yellow', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '76',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 오산공장 세팅
            createButton(container,  '오산공장', '오산','white', 'chocolate', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '80',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 천안공장 세팅
            createButton(container,  '천안공장', '천안','white', 'chocolate', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '79',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 삼성웰스토리 세팅
            createButton(container,  '삼성웰스토리', '삼성','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '5894501,5184101,5184201,4580801,5481001,6977401,7620101,5462501,5165801,5184901,5185001,5185601,5185101,5286301,5164101,5164301,5188001',
                    SHIPTO_ID: '5894501,5184101,5184201,4580801,5481001,6977401,7620101,5462501,5165801,5184901,5185001,5185601,5185101,5286301,5164101,5164301,5188001',
                    SHIPTO_TCD: '76',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 특판 세팅
            createButton(container,  '특판', '특판','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '77',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 외부판매 세팅
            createButton(container, '외부판매', '외부','white', 'black', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '30',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 이마트 중계 세팅
            createButton(container,  '이마트 중계', '중계','black', 'gold', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_CD: '',
                    ITEM_GCD: 'A018,A021,A022,A037,A050',
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