//commonSetting.js
console.log("기본세팅");

// ✅ 파트 선택 드롭다운
function createScriptSelector(textEl, left = '100px') {
    const container = document.createElement('div');
    container.id = 'drop-custom';
    container.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';
    container.style.left = left;

    const select = document.createElement('select');
    select.className = 'custom-button-inner';
    select.style.backgroundColor = 'yellow';
    select.style.color = 'black';
    select.style.width = '100px';
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
    textEl.appendChild(container);

    // 선택값 없을 경우 안내 팝업
    if (!selectedValue) {
        setTimeout(() => {
            alert("👋 사용자 스크립트를 먼저 선택해주세요!\n(화면 상단 좌측 드롭다운)");
        }, 500);
    }
}
window.createScriptSelector = createScriptSelector;

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
    const textEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");
    if (textEl && typeof createScriptSelector === 'function') {
        createScriptSelector(textEl);
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


// // 자동조회 차단
// if (!window._searchPatchInitialized) {
//     console.log("초기화");
//
//     window._searchPatchInitialized = true;
//
//     // 1. 원래 search 함수 백업
//     const realSearch = window.search || function () {};
//     console.log("🔧 원래 search 함수 백업됨:", realSearch);
//
//     // 2. 임시로 search 함수 무효화
//     window.search = function () {
//         console.log("🛑 search 차단됨");
//     };
//
//     function restoreSearch() {
//         window.search = realSearch;
//         console.log("✅ search 복원됨 (버튼 클릭 감지)");
//     }
//
//     // ✅ 모든 버튼 클릭 시 search 복원
//     document.addEventListener("click", function (e) {
//         const button = e.target.closest("button");
//         if (button) {
//             restoreSearch();
//         }
//     });
// }
