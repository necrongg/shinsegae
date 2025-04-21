//commonSetting.js
console.log("기본세팅");

const textEl = document.querySelector("#SEARCH_CONDITION_header-title-textEl");

function createScriptSelector(textEl, right = '300px') {
    const container = document.createElement('div');
    container.id = 'drop-custom';
    container.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';
    container.style.right = right;

    const select = document.createElement('select');
    select.className = 'x-tool-tool-el custom-button-inner';
    select.style.backgroundColor = 'lightgray';
    select.style.color = 'black';
    select.title = '사용자 스크립트 설정';

    const options = ['', 'freeze', 'bk', 'ck', 'rt']; // 공백 포함
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt ? opt.toUpperCase() : '-- 선택 --';
        select.appendChild(option);
    });

    const current = localStorage.getItem('wmsScriptSet');
    const selectedValue = current ? JSON.parse(current).find(f => f.endsWith('.js') && f !== 'commonSettings.js')?.replace('.js', '') : '';

    select.value = selectedValue || '';

    select.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val) return;

        const selectedScript = `${val}.js`;
        localStorage.setItem('wmsScriptSet', JSON.stringify([
            'css.css',
            'commonSettings.js',
            selectedScript
        ]));
        alert(`✅ 사용자 설정이 [${selectedScript}]로 저장되었습니다. 새로고침 후 적용됩니다.`);
    });

    container.appendChild(select);
    textEl.appendChild(container);

    // 선택값 없을 경우 안내 팝업
    if (!selectedValue) {
        setTimeout(() => {
            alert("👋 사용자 스크립트를 먼저 선택해주세요!\n(화면 상단 우측 드롭다운)");
        }, 500);
    }
}

// 전역으로 노출
window.createScriptSelector = createScriptSelector;

// 새로고침 차단
document.addEventListener("keydown", function (e) {
    // Ctrl + R 또는 F5 방지
    if ((e.ctrlKey && e.key.toLowerCase() === "r") || e.key === "F5") {
        e.preventDefault();
        console.log("🔒 새로고침 차단됨");
    }
});


// ✅ 공통 드롭다운 삽입
if (typeof createScriptSelector === 'function') {
    createScriptSelector(textEl);
} else {
    console.error("❌ createScriptSelector 함수가 정의되지 않았습니다.");
}

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
