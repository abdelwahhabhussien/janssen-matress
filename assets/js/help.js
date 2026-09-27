/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- help topics dropdown start - help topics dropdown end
- help topics switch start - help topics switch end
==================================================================== */





/* ================================================================== 
help topics dropdown start
==================================================================== */

function helpTopicsDropdown() {
    // get all parents
    const items = document.querySelectorAll('.help-topics-item');

    items.forEach(item => {
        const btn = item.querySelector('.help-topics-btn');

        const targets = {
            plus: item.querySelector('.help-topics-btn-plus-svg'),
            minus: item.querySelector('.help-topics-btn-minus-svg'),
            dropdown: item.querySelector('.help-topics-dropdown')
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent outside click closing immediately

            const isOpen = targets.dropdown.classList.contains('open');

            // close all first (optional but recommended UX)
            closeAll(items);

            if (!isOpen) {
                targets.dropdown.classList.add('open');
                targets.plus?.classList.add('open');
                targets.minus?.classList.add('open');
            }
        });
    });

    // click outside
    document.addEventListener('click', () => {
        closeAll(items);
    });

    function closeAll(items) {
        items.forEach(item => {
            item.querySelector('.help-topics-dropdown')?.classList.remove('open');
            item.querySelector('.help-topics-btn-plus-svg')?.classList.remove('open');
            item.querySelector('.help-topics-btn-minus-svg')?.classList.remove('open');
        });
    }
}

// call it
helpTopicsDropdown();

/* ================================================================== 
help topics dropdown end
==================================================================== */













/* ================================================================== 
help topics switch start
==================================================================== */

function initHelpTopicsMultipleValues() {
    // Get all value targets
    const valueTargets = document.querySelectorAll('.topic-category'); // now multiple
    const openTargets = document.querySelectorAll('.help-topics-items, .help-topics-category button');
    const btns = document.querySelectorAll('.help-topics-category-btn');

    // --- 1. Set default: button with data-helpTopicsItems="1" ---
    const defaultBtn = document.querySelector('.help-topics-category-btn[data-helpTopicsItems="1"]');
    if (defaultBtn) {
        const defaultTargets = document.querySelectorAll(
            `.help-topics-items[data-helpTopicsItems="1"], .help-topics-category button[data-helpTopicsItems="1"]`
        );
        defaultTargets.forEach(t => t.classList.add('open')); // open default targets

        // update all value targets
        valueTargets.forEach(v => {
            v.textContent = defaultBtn.textContent.trim();
        });
    }

    // --- 2. Click handler ---
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnData = btn.dataset.helptopicsitems;
            if (!btnData) return;

            const matchingTargets = document.querySelectorAll(
                `.help-topics-items[data-helpTopicsItems="${btnData}"], .help-topics-category button[data-helpTopicsItems="${btnData}"]`
            );

            // only proceed if first matching target is not already open
            if (!matchingTargets[0].classList.contains('open')) {
                // remove open class from all targets
                openTargets.forEach(t => t.classList.remove('open'));

                // add open class to matching targets
                matchingTargets.forEach(t => t.classList.add('open'));

                // update all value targets
                valueTargets.forEach(v => {
                    v.textContent = btn.textContent.trim();
                });
            }
        });
    });
}

// Initialize
initHelpTopicsMultipleValues();

/* ================================================================== 
help topics switch end
==================================================================== */
