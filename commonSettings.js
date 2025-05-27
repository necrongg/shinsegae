// ✅ 파트 선택 드롭다운 + x표시 on/off
function createScriptSelector(panel) {
    const container = document.createElement('div');
    container.id = 'custom-div';
    container.className = 'x-tool x-box-item x-tool-default x-tool-after-title custom-button';
    container.style.left = '235px';
    container.style.top = '8px';

    // ✅ 파트 선택 드롭다운
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
    panel.appendChild(container);

    // 선택값 없을 경우 안내 팝업
    if (!selectedValue) {
        setTimeout(() => {
            alert("👋 사용자 파트를 먼저 선택해주세요!\n(화면 좌측 상단 드롭다운)");
        }, 500);
    }

    // ✅ x닫기 버튼 on/off 체크박스
    const checkWrapper = document.createElement('div');
    checkWrapper.style.display = 'inline-flex';
    checkWrapper.style.alignItems = 'center';
    checkWrapper.style.marginLeft = '8px';

    const checkClose = document.createElement('input');
    checkClose.type = 'checkbox';
    checkClose.id = 'toggleCloseEl';
    checkClose.title = 'X표시 ON/OFF';
    checkClose.style.marginLeft = '8px';

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
    const observer = new MutationObserver((mutationsList) => {
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

window.createScriptSelector = createScriptSelector;