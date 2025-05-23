//freeze.js

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

// 냉동 축산
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const targetEl = document.querySelector("#SEARCH_CONDITION_header-targetEl");
        const titleEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");

        // '임박재고현황' 화면이 열릴 때 자동으로 값 세팅 및 클릭
                if (titleEl && titleEl.textContent.trim().includes("임박재고현황")) {
                    const button = document.getElementById("commonGrid-1033Button0");
                    setElementsValues({
                        STRR_ID: '',
                        ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
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

        if (targetEl) {
            // 품목그룹 추가(축산)
            createButton(targetEl, '1490px', '품목그룹(축산)', '축산','black', 'gold', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047');
            });
            
            // 품목그룹 추가(축산+세린)
            createButton(targetEl, '1443px', '품목그룹(축산+세린)', '축/세','black', 'Goldenrod', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A066,A41,A42,A039,A041,A003,A004,A044,A045,A013,A051,A007,A047,A012,A059,A061,A043,A028,A046');
            });

            // 미스터피자 세팅
            createButton(targetEl, '1396px', '미스터피자,스무디킹', '🥤🍕','white', 'white', () => {
                setElementsValues({
                    STRR_ID: '0100037,0037396',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 동원홈푸드 세팅
            createButton(targetEl, '1349px', '동원홈푸드', '동원','white', 'blue', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                    CUST_CD : '5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
                    SHIPTO_ID: '5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // 푸디스트 세팅
            createButton(targetEl, '1302px', '푸디스트', '푸디','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                    CUST_CD : '6984101,8077601,8218701,8218001',
                    SHIPTO_ID: '6984101,8077601,8218701,8218001',
                    SHIPTO_TCD: '',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // MBK 세팅
            createButton(targetEl, '1255px', 'MBK 마켓빌더즈코리아', 'MBK','white', 'black', () => {
                setElementsValues({
                    STRR_ID: '0039656',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 경인 세팅
            createButton(targetEl, '1208px', '경인', '경인','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 지방 세팅
            createButton(targetEl, '1161px', '지방', '지방','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 온라인이관 세팅
                        createButton(targetEl, '1114px', '이관', '이관','black', 'plum', () => {
                            setElementsValues({
                                STRR_ID: '',
                                ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
                                CUST_CD: '1012201,0111301',
                                SHIPTO_ID: '1012201,0111301',
                                SHIPTO_TCD: '',
                                OUTB_TCD: 'IVOBXXXXXXXX',
                                OUTB_WH: ''
                            });
            });

            observer.disconnect();  // observer 즉시 종료
            break;  // 루프 탈출
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });