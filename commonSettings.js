//commonSetting.js
console.log("기본세팅");

// ✅ F1 도움말 정지 / 조회 단축키
document.addEventListener('keydown', function(event) {
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

// ✅ F2 오더라인할당 피킹차수 단축키
document.addEventListener('keydown', function(event) {
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




// ✅ 신세계 이미지 옆, 파트 선택 드롭다운 + x표시 on/off + 도움말
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

}
window.createScriptSelector = createScriptSelector;

// ✅ 파트 선택 드롭다운
function createPartDropdown(container, panel) {
    const select = document.createElement('select');
    select.className = 'custom-button-inner drop-down';
    select.title = '사용자 스크립트 설정';

    const options = ['', 'freeze', 'bk', 'ck', 'rt','master'];
    const labelMap = {
        'freeze': '냉동',
        'bk': '베이커리',
        'ck': '세린+CK',
        'rt': '상온',
        'master': '관리자'
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

// ✅ 도움말
function createSupport(container) {
    const checkWrapper = document.createElement('div');
    checkWrapper.style.display = 'inline-flex';
    checkWrapper.className = 'custom-button-inner check-support';

    const label = document.createElement('label');
    label.textContent = '?';
    label.style.cursor = 'pointer';
    label.style.userSelect = 'none';

    // 모달 요소 생성
    const modal = document.createElement('div');
    modal.className = 'support-modal';
    modal.innerHTML = `
        <strong>단축키 안내</strong><br><br>
        <ul style="margin: 0; padding-left: 20px;">
            <li><b>F1</b>: 조회</li>
            <li><b>F2</b>: 오더라인할당 피킹차수 단축키</li>
        </ul>
    `;

    // 오버레이 생성 (모달 바깥 클릭 감지용)
    const overlay = document.createElement('div');
    modal.className = 'support-overlay';

    // 클릭 시 모달 토글
    label.addEventListener('click', () => {
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
    checkWrapper.appendChild(label);
    container.appendChild(checkWrapper);
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
window.setElementsValues = setElementsValues;

