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

// 냉동 축산
function startFreezeObserver() {
    const freezeObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const headerTitle = document.querySelector("#SEARCH_CONDITION_header-title");
        const textEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");

        // 제목이 일치하는지 확인하고, 해당 조건에 맞는 값을 설정
        const itemGdcValue = (
            textEl && textEl.textContent.includes('오더라인피킹')) ?
            `A42,A039,A041,A004,A013,A007,A047,A012,A059,A061,A066,A043,A028,A046`
            : `A004,A013,A039,A42,A045,A007,A047`;

        if (headerTitle) {
            createButtonContainer(headerTitle);
            const container = document.querySelector(".custom-button-container");

            // 품목그룹 추가(축산)
            createButton(container, '품목그룹(축산)', '축산','black', 'gold', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A004,A013,A039,A42,A045,A007,A047');
            });
            
            // 품목그룹 추가(축산+세린)
            createButton(container, '품목그룹(축산+세린)', '축/세','black', 'Goldenrod', () => {
                setElementValue('[name*="ITEM_GCD"]', 'A42,A039,A041,A004,A013,A007,A047,A012,A059,A061,A066,A043,A028,A046');
            });

            // 미스터피자 세팅
            createButton(container, '미스터피자,스무디킹', '🥤🍕','black', 'white', () => {
                setElementsValues({
                    STRR_ID: '0100037,0037396',
                    ITEM_GCD: 'A004,A013,A039,A42,A045,A007,A047',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 군납
            createButton(container, '군납', '군납','white', 'blue', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: 'A004,A013,A039,A42,A045,A007,A047,A012,A059,A061,A043,A028,A046',
                    CUST_CD : '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '30',
                    OUTB_TCD: '',
                    OUTB_WH: ''
                });
            });

            // CK 세린에서 같이 하기로했음(2025.05.26)
            // // 동원홈푸드 세팅
            // createButton(targetEl,  '동원홈푸드', '동원','white', 'blue', () => {
            //     setElementsValues({
            //         STRR_ID: '',
            //         ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
            //         CUST_CD : '5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
            //         SHIPTO_ID: '5166701,5594501,5288301,5594701,8469301,5710101,6102901,6102401,7106801,7106101,8469501,8469502,8469401,8469402',
            //         SHIPTO_TCD: '',
            //         OUTB_TCD: '',
            //         OUTB_WH: ''
            //     });
            // });
            //
            // // 푸디스트 세팅
            // createButton(targetEl,  '푸디스트', '푸디','white', 'orange', () => {
            //     setElementsValues({
            //         STRR_ID: '',
            //         ITEM_GCD: 'A003,A004,A013,A039,A41,A42,A044,A045,A051,A007,A047',
            //         CUST_CD : '6984101,8077601,8218701,8218001',
            //         SHIPTO_ID: '6984101,8077601,8218701,8218001',
            //         SHIPTO_TCD: '',
            //         OUTB_TCD: '',
            //         OUTB_WH: ''
            //     });
            // });

            // MBK 세팅
            createButton(container, 'MBK 마켓빌더즈코리아', 'MBK','white', 'black', () => {
                setElementsValues({
                    STRR_ID: '0039656',
                    ITEM_GCD: 'A004,A013,A039,A42,A045,A007,A047',
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 경인 세팅
            createButton(container,  '경인', '경인','white', 'red', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: itemGdcValue,
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: 'IOOBDCNMXXXX',
                    OUTB_WH: ''
                });
            });

            // 지방 세팅
            createButton(container,  '지방', '지방','white', 'orange', () => {
                setElementsValues({
                    STRR_ID: '',
                    ITEM_GCD: itemGdcValue,
                    CUST_CD: '',
                    SHIPTO_ID: '',
                    SHIPTO_TCD: '20',
                    OUTB_TCD: '',
                    OUTB_WH: '01114,01115,04736'
                });
            });

            // 온라인이관 세팅
                        createButton(container,  '이관', '이관','black', 'plum', () => {
                            setElementsValues({
                                STRR_ID: '',
                                ITEM_GCD: 'A004,A013,A039,A42,A045,A007,A047',
                                CUST_CD: '1012201,0111301',
                                SHIPTO_ID: '1012201,0111301',
                                SHIPTO_TCD: '',
                                OUTB_TCD: 'IVOBXXXXXXXX',
                                OUTB_WH: ''
                            });
            });

            freezeObserver.disconnect();  // observer 즉시 종료
            break;  // 루프 탈출
        }
    }
});
    freezeObserver.observe(document.body, { childList: true, subtree: true });
}
window.startFreezeObserver = startFreezeObserver;

// 최초 실행
startFreezeObserver();