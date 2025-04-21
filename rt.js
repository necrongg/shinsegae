// STRR_ID : 화주
// ITEM_GCD : 품목그룹
// OUTB_TCD : 출고유형
// OUTB_WH : 배송센터
// CUST_CD : 배송처코드
// SHIPTO_ID : 배송처
// SHIPTO_TCD : 물류관리부서
// OUTB_ECT_DATE : 출고일자
// EMART_CENTER_RCV_DATE : 이마트 센터 입고일

// CSS 분리
const style = document.createElement('style');
style.textContent = `
  .custom-button {
    position: absolute;
    cursor: pointer;
    z-index: 1000;
  }

  .custom-button-inner {
    opacity: 1;
    border-radius: 10px;
    width: 32px;
    text-align: center;
    font-weight: bold;
    transition: all 0.1s;
    border: 1px solid rgba(0,0,0,0.1);
  }

  .custom-button-inner:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);

// 상온냉장
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
                ITEM_GCD: 'A008,A048,A006,A002,A43,A024,A023,A054,A034',
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
                }, 1000);
            }
        }else {
            console.log(titleEl);
            console.log(titleEl.textContent.trim());
        }

        if (targetEl) {
            // 품목그룹 추가(상온)
            createButton(targetEl, '1490px', '품목그룹(상온)', '품목','black', 'gold', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A008,A048,A006,A002,A024,A023,A054,A034,A017,A016');
            });

            // 동원홈푸드 세팅
            createButton(targetEl, '1443px', '동원홈푸드', '동원','white', 'blue', () => {
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
            createButton(targetEl, '1396px', '스무디킹-경인', '🥤경인','white', 'indigo', () => {
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
            createButton(targetEl, '1349px', '스무디킹-지방', '🥤지방','white', 'indigo', () => {
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
            createButton(targetEl, '1302px', '미스터피자-경인', '🍕경인','white', 'chocolate', () => {
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
            createButton(targetEl, '1255px', '미스터피자-지방', '🍕지방','white', 'chocolate', () => {
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
            createButton(targetEl, '1208px', 'MRO', 'MRO','white', 'black', () => {
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
            createButton(targetEl, '1161px', '경인', '경인','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '0003893',
                    ITEM_GCD: 'A008,A048,A006,A002,A024',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 지방 세팅
            createButton(targetEl, '1114px', '지방', '지방','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '0003893',
                    ITEM_GCD: 'A008,A048,A006,A002,A024,A023',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            observer.disconnect();  // observer 즉시 종료
            break;  // 루프 탈출
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });