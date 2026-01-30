console.log("11.06/12:05 패치");

// 🖨️ OZ 작업자검수자 복붙버튼생성 (특정 URL에서만 실행)
if (location.href.startsWith('https://slp-new.shinsegaefood.com/view/common/jsp/')) {
    const ozObserver = new MutationObserver((mutations, obs) => {
        const ozViewer = document.getElementById('OZViewer');
        if (!ozViewer) return;

        obs.disconnect(); // 감지 중지

        // 버튼 컨테이너
        const childDiv = document.createElement('div');
        childDiv.className = 'ozClipboardWrapper';
        ozViewer.firstChild
            ? ozViewer.insertBefore(childDiv, ozViewer.firstChild)
            : ozViewer.appendChild(childDiv);

        // 버튼 생성 함수
        const createClipboardButton = (className, defaultText, copyText) => {
            const btn = document.createElement('div');
            btn.className = `ozClipboard ${className}`;
            btn.textContent = defaultText;
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(copyText).then(() => {
                    console.log(`✅ 클립보드에 복사됨: ${copyText}`);
                    btn.textContent = '✅ 복사 완료!';
                    setTimeout(() => (btn.textContent = defaultText), 2000);
                }).catch(err => console.error('❌ 복사 실패:', err));
            });
            childDiv.appendChild(btn);
        };

        // 버튼 추가
        createClipboardButton('inspector', '📋 작업자/검수자',
            '작 업 자  : _________________(인)\n검 수 자  : _________________(인)');

        createClipboardButton('transfer', '📋 평택->온라인',
            '평택->용인온라인 이관');

        createClipboardButton('exp', '📋 임박재고출고',
            '-임박재고출고-\n★소비기한 빨간라벨★ 꼭 부착!!!');

        createClipboardButton('exp', '📋 이마트24',
            '※내일 17시 30분까지\n나-8번으로 이동 부탁 드립니다');

        createClipboardButton('exp', '📋 로운',
            '※내일 15시 까지\n가-10번 으로 이동 부탁 드립니다');
    });

    ozObserver.observe(document.body, {childList: true, subtree: true});
}

// 🔰 새로고침 차단
document.addEventListener("keydown", function (e) {
    // Ctrl + R 또는 F5 방지
    if ((e.ctrlKey && e.key.toLowerCase() === "r") || e.key === "F5") {
        e.preventDefault();
        alert("🔒 새로고침 차단됨");
    }
});

// 🔰 F1 도움말 정지 / 조회 단축키
document.addEventListener('keydown', function (event) {
    if (event.key === 'F1' || event.keyCode === 112) {
        event.preventDefault();

        // x-toolbar 클래스 내부에서만 검색
        const toolbar = document.querySelector('.x-toolbar');
        if (!toolbar) {
            console.warn('x-toolbar 요소를 찾을 수 없습니다.');
            return;
        }

        // toolbar 내부의 모든 <a> 태그 검색
        const anchors = toolbar.querySelectorAll('a');

        for (const anchor of anchors) {
            if (anchor.textContent.includes('조회')) {
                anchor.click();
                //console.log('"조회" 버튼 클릭됨');
                break;
            }
        }
    }
});

// 🔰 F2 오더라인할당 피킹차수 단축키
document.addEventListener('keydown', function (event) {
    if (event.key === 'F2' || event.keyCode === 113) {
        event.preventDefault();

        // 버튼 요소 가져오기
        const button = document.getElementById('lalocOrderHeaderButton1');
        if (button) {
            button.click(); // 클릭 이벤트 발생
        } else {
            console.warn('버튼을 찾을 수 없습니다.');
        }
    }
});

(function () {
    const TARGET_TEXT = '품목별 총량(LOT제외)';
    const PICK_BUTTON_ID = 'perPcsButton3';
    const PICK_BUTTON_ID2 = 'pickHisButton2';
    const COMBO_INPUT_SEL = '#combo-0-inputEl';
    const LIST_APPEAR_TIMEOUT = 3000;
    const AFTER_SELECT_DELAY  = 150;

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const norm  = (s) => (s || '').replace(/\s+/g, ' ').trim();

    // 🔹 클릭만
    const fireClick = (el) => {
        if (!el) return;
        el.click?.();
        // 필요 시 아래 한 줄만 유지하고 el.click()은 제거해도 됩니다.
        // el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    };

    const waitForListItems = async (timeoutMs = LIST_APPEAR_TIMEOUT) => {
        const t0 = performance.now();
        while (true) {
            const items = document.querySelectorAll('li.x-boundlist-item');
            if (items.length > 0) return Array.from(items);
            if (performance.now() - t0 > timeoutMs) throw new Error('바운드리스트가 나타나지 않았습니다.');
            await sleep(50);
        }
    };

    const findLiByText = (items, text) => {
        const target = norm(text);
        return items.find(li => norm(li.textContent) === target);
    };

// 컨테이너 내부(#__labelComboPopup__)에서만 "인쇄|Print" 버튼 탐색
    const findPrintButton = () => {
        const root = document.querySelector('#__labelComboPopup__');
        if (!root) return null;

        // role="button"이거나 x-btn/button류 후보
        let candidates = Array.from(
            root.querySelectorAll('a[role="button"], button[role="button"], a.x-btn, button')
        );

        // 텍스트/라벨/타이틀에 "인쇄|Print" 포함 필터
        candidates = candidates.filter(el => {
            const text  = (el.textContent || '').trim();
            const title = el.getAttribute('title') || '';
            const aria  = el.getAttribute('aria-label') || '';
            return /인쇄|Print/i.test(text) || /인쇄|Print/i.test(title) || /인쇄|Print/i.test(aria);
        });

        // 가시성/활성 필터
        const isVisible = (el) => {
            const cs = getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
        };
        const btn = candidates.find(el => isVisible(el) && el.getAttribute('aria-disabled') !== 'true' && !el.disabled);

        return btn || null;
    };

    // 콤보 열기: ExtJS API가 있으면 expand, 없으면 input 클릭
    const openCombo = async () => {
        if (window.Ext && typeof Ext.getCmp === 'function') {
            const cmp = Ext.getCmp('combo-0'); // 컴포넌트 id가 다르면 수정
            if (cmp && typeof cmp.expand === 'function') {
                cmp.expand();
                try { await waitForListItems(LIST_APPEAR_TIMEOUT); return; } catch {}
            }
        }
        const input = document.querySelector(COMBO_INPUT_SEL);
        if (!input) throw new Error('콤보 input을 찾지 못했습니다.');
        fireClick(input);
        await waitForListItems(LIST_APPEAR_TIMEOUT);
    };

    let busy = false;

    document.addEventListener('keydown', async (event) => {
        if (busy) return;
        if (event.key === 'F4' || event.keyCode === 115) {
            busy = true;
            event.preventDefault();

            try {
                // 1) 진입 버튼 클릭
                const btn = document.getElementById(PICK_BUTTON_ID);
                const btn2 = document.getElementById(PICK_BUTTON_ID2);

                if (btn){
                    fireClick(btn);
                }else if (btn2){
                    fireClick(btn2);
                }else throw new Error(`인쇄 버튼 없음`);

                await sleep(700);

                // 2) 콤보 열기
                await openCombo();

                // 3) 항목 클릭
                const items = await waitForListItems(LIST_APPEAR_TIMEOUT);
                const li = findLiByText(items, TARGET_TEXT);
                if (!li) throw new Error(`"${TARGET_TEXT}" 항목을 찾지 못했습니다.`);
                li.scrollIntoView({ block: 'center' });
                fireClick(li);
                await sleep(AFTER_SELECT_DELAY);

                // 4) 다음 버튼 클릭
                const printButton = findPrintButton();
                if (!printButton) throw new Error('“다음” 버튼을 찾지 못했습니다.');
                printButton.scrollIntoView({ block: 'center' });
                fireClick(printButton);

            } catch (e) {
                alert(e.message);
            } finally {
                setTimeout(() => { busy = false; }, 300);
            }
        }
    });
})();

// 🆗 신세계 이미지 옆, 파트 선택 드롭다운 + x표시 on/off + 도움말
function createScriptSelector(panel) {
    const container = document.createElement('div');
    container.id = 'custom-div';
    container.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';

    panel.appendChild(container);

    // ✅ 파트 선택 드롭다운
    createPartDropdown(container, panel);

    // ✅ x닫기 버튼 on/off 체크박스
    createCloseToggle(container);

    // ✅ 도움말
    createSupport(container);

    // ✅ 갤러리
    // createGallery(container);
}

window.createScriptSelector = createScriptSelector;

// 🆗 파트 선택 드롭다운
function createPartDropdown(container,) {
    const select = document.createElement('select');
    select.className = 'custom-button-inner drop-down';
    select.title = '사용자 스크립트 설정';
    select.style.cursor = 'pointer';

    const options = ['', 'm-freeze', 'bk', 'rt', 'youngin-f', 'youngin-b', 'master'];
    const labelMap = {
        'm-freeze': '축산+CK통합',
        'bk': '베이커리',
        'rt': '상온',
        'youngin-f': '용인-지상',
        'youngin-b': '용인-지하',
        'master': '관리자'
    };
    // 'freeze': '축산',
    // 'ck': '세린+CK',

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt ? labelMap[opt] || opt.toUpperCase() : 'ㅡ 선택 ㅡ';
        select.appendChild(option);
    });

    const current = localStorage.getItem('wmsScriptSet');
    const selectedValue = current ? JSON.parse(current).find(f => f.endsWith('.js') && f !== 'commonSettings.js')?.replace('.js', '') : '';

    select.value = selectedValue || '';

    select.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val) return;

        const selectedScript = `${val}.js`;
        const label = labelMap[val] || val.toUpperCase();

        localStorage.setItem('wmsScriptSet', JSON.stringify([
            'css.css',
            'commonSettings.js',
            selectedScript
        ]));

        alert(`✅ 파트 설정이 [${label}]로 저장되었습니다. 새로고침 후 적용됩니다.`);
    });

    container.appendChild(select);

    // 선택값 없을 경우 안내
    if (!selectedValue) {
        setTimeout(() => {
            alert("👋 사용자 파트를 먼저 선택해주세요!\n(화면 좌측 상단 드롭다운)");
        }, 500);
    }
}

// 🆗 x닫기 버튼 on/off 체크박스
function createCloseToggle(container) {
    const checkWrapper = document.createElement('div');
    checkWrapper.style.display = 'inline-flex';
    checkWrapper.className = 'custom-button-inner check-wrapper';

    const checkClose = document.createElement('input');
    checkClose.type = 'checkbox';
    checkClose.id = 'toggleCloseEl';
    checkClose.title = 'X표시 ON/OFF';

    const label = document.createElement('label');
    label.htmlFor = 'toggleCloseEl';
    label.textContent = 'X표시 ON/OFF';
    label.style.marginLeft = '4px';
    label.style.cursor = 'pointer';


    // closeEl 토글 함수
    function toggleCloseElDisplay(hide) {
        const closeEls = document.querySelectorAll('[data-ref="closeEl"]');
        closeEls.forEach(el => {
            el.style.display = hide ? 'none' : 'block';
        });
    }

    // 체크박스 이벤트
    checkClose.addEventListener('change', () => {
        const shouldHide = checkClose.checked;
        toggleCloseElDisplay(shouldHide);
    });

    // MutationObserver로 새로 추가된 closeEl 감지
    const observer = new MutationObserver(() => {
        if (checkClose.checked) {
            toggleCloseElDisplay(true);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    container.appendChild(checkWrapper);
    checkWrapper.appendChild(label);
    checkWrapper.appendChild(checkClose);
}

// 🆗 도움말
function createSupport(container) {
    const checkWrapper = document.createElement('div');
    checkWrapper.style.display = 'inline-flex';
    checkWrapper.className = 'custom-button-inner check-support';

    const label = document.createElement('label');
    label.textContent = '?';
    label.style.userSelect = 'none';
    label.style.cursor = 'pointer';


    // 모달 요소 생성
    const modal = document.createElement('div');
    modal.className = 'support-modal';
    modal.innerHTML = `
        <strong>단축키 안내</strong><br><br>
        <ul style="margin: 0; padding-left: 20px;">
            <li><b>F1</b> : 조회</li>
            <li><b>F2</b> : 오더라인할당-피킹차수 단축키</li>
            <li><b>F4</b> : 품목별 총량(LOT제외) 바로 인쇄</li>
        </ul>
    `;

    // 오버레이 생성 (모달 바깥 클릭 감지용)
    const overlay = document.createElement('div');
    overlay.className = 'support-overlay';

    // 클릭 시 모달 토글
    checkWrapper.addEventListener('click', () => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // 바깥 클릭 시 모달 닫기
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // DOM 삽입
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    container.appendChild(checkWrapper);
    checkWrapper.appendChild(label);
}

// 🆗 갤러리
function createGallery(container) {
    const checkWrapper = document.createElement('div');
    checkWrapper.style.display = 'inline-flex';
    checkWrapper.className = 'custom-button-inner check-gallery';

    const label = document.createElement('label');
    label.textContent = '갤러리이동';
    label.style.userSelect = 'none';
    label.style.cursor = 'pointer';
    label.addEventListener('click', () => {
        try {
            // 현재 페이지의 모든 쿠키를 가져옴
            const cookieString = document.cookie;
            console.log('🍪 쿠키 수집:', cookieString);

            // Base64 인코딩 (URL에 안전하게 포함하기 위해)
            const encodedCookies = btoa(encodeURIComponent(cookieString));

            // URL에 쿠키 데이터 포함
            const targetUrl = `http://localhost:8080/index.html?sessionData=${encodedCookies}`;
            window.open(targetUrl, '_blank');

        } catch (error) {
            console.error('❌ 세션 전달 실패:', error);
            // 실패 시 쿠키 없이 이동
            window.open('http://localhost:8080/index.html', '_blank');
        }
    });

    container.appendChild(checkWrapper);
    checkWrapper.appendChild(label);
}

// ✅ 공통 드롭다운 삽입
if (!window.__wms_common_observer__) {
    window.__wms_common_observer__ = true;
    const commonObserver = new MutationObserver((_, obs) => {
        const panel = document.querySelector('#panel-1009-innerCt');
        if (panel && typeof createScriptSelector === 'function') {
            createScriptSelector(panel);
            obs.disconnect();
        }
    });
    commonObserver.observe(document.body, {childList: true, subtree: true});
}

// ✅ 공통 버튼생성 컨테이너
function createButtonContainer(headerTitle) {
    const div = document.createElement('div');
    div.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button-container';
    headerTitle.appendChild(div);
}

window.createButtonContainer = createButtonContainer;

// ✅ 공통 버튼생성
function createButton(headerTitle, title, textContent, color, bgColor, callback) {
    const div = document.createElement('div');
    div.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';

    const childDiv = document.createElement('div');
    childDiv.className = 'x-tool-tool-el custom-button-inner';
    childDiv.style.backgroundColor = bgColor;
    childDiv.style.color = color;
    childDiv.textContent = textContent;
    childDiv.title = title;
    childDiv.id = title;

    div.addEventListener('click', callback);

    headerTitle.appendChild(div);
    div.appendChild(childDiv);
}

window.createButton = createButton;

// ✅ 공통 버튼생성 로직
function setElementValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.value = value;
    } else {
        console.error(`Input element with selector "${selector}" not found.`);
    }
}

window.setElementValue = setElementValue;

// ✅ 공통 버튼생성 로직2
function setElementsValues(values) {
    Object.entries(values).forEach(([key, value]) => {
        setElementValue(`[name*="${key}"]`, value);
    });
}

// ✅ 이마트날짜변환(보류중)
function changeDate() {
    const OUTBOUND_DATE_SELECTOR = '[name="OUTB_ECT_DATE"]';
    const EMART_RECEIVE_DATE_SELECTOR = '[name="EMART_CENTER_RCV_DATE"]';

    const outboundDateInput = document.querySelector(OUTBOUND_DATE_SELECTOR);
    const emartReceiveDateInput = document.querySelector(EMART_RECEIVE_DATE_SELECTOR);

    if (outboundDateInput.value !== '') {
        emartReceiveDateInput.value = outboundDateInput.value;
        outboundDateInput.value = '';
    }
}

window.setElementsValues = setElementsValues;

