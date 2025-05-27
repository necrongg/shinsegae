//commonSetting.js
console.log("기본세팅");

// ✅ 신세계 이미지 옆, 파트 선택 드롭다운 + x표시 on/off
function createScriptSelector(panel) {
    const container = document.createElement('div');
    container.id = 'custom-div';
    container.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';
    container.style.left = '235px';
    container.style.top = '8px';

    // ✅ 파트 선택 드롭다운
    createPartDropdown(container, panel);

    // ✅ x닫기 버튼 on/off 체크박스
    createCloseToggle(container);

    panel.appendChild(container);
}
window.createScriptSelector = createScriptSelector;

// ✅ 파트 선택 드롭다운
function createPartDropdown(container, panel) {
    const select = document.createElement('select');
    select.className = 'custom-button-inner drop-down';
    select.title = '사용자 스크립트 설정';

    const options = ['', 'freeze', 'bk', 'ck', 'rt'];
    const labelMap = {
        'freeze': '냉동',
        'bk': '베이커리',
        'ck': '세린+CK',
        'rt': '상온'
    };

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

// ✅ x닫기 버튼 on/off 체크박스
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

// ✅ 새로고침 차단
document.addEventListener("keydown", function (e) {
    // Ctrl + R 또는 F5 방지
    if ((e.ctrlKey && e.key.toLowerCase() === "r") || e.key === "F5") {
        e.preventDefault();
        alert("🔒 새로고침 차단됨");
    }
});

// ✅ 공통 드롭다운 삽입
const commonObserver = new MutationObserver((mutations, obs) => {
    const panel = document.querySelector("#panel-1009-innerCt");
    if (panel && typeof createScriptSelector === 'function') {
        createScriptSelector(panel);
        obs.disconnect();
    }
});
commonObserver.observe(document.body, { childList: true, subtree: true });

// ✅ 공통 버튼생성
function createButton(targetEl, left, title, textContent, color, bgColor, callback) {
    const div = document.createElement('div');
    div.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';
    div.style.left = left;

    const childDiv = document.createElement('div');
    childDiv.className = 'x-tool-tool-el custom-button-inner';
    childDiv.style.backgroundColor = bgColor;
    childDiv.style.color = color;
    childDiv.textContent = textContent;
    childDiv.title = title;

    div.addEventListener('click', callback);

    targetEl.appendChild(div);
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
window.setElementsValues = setElementsValues;