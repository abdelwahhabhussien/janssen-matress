/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- category page
  - category page result bar sort by
  - category page filter flex categories
  - category page filter flex price filter
  - category page filter flex brand
  - category page filter flex status
==================================================================== */



/* ============================================================================================
category page start
=============================================================================================*/



/* ============================================================================================
category page result bar sort by start
=============================================================================================*/

function sortBy() {
  const sortBlocks = document.querySelectorAll('.cg-sort-by');

  sortBlocks.forEach(sortBlock => {
    const sortBtn = sortBlock.querySelector('.cg-sort-by-btn');
    const sortByOptions = sortBlock.querySelector('.cg-sort-by-options');
    const arrow = sortBlock.querySelector('.cg-sort-by-dropdown-btn-arrow');
    const selectedOpt = sortBlock.querySelector('.cg-sort-by-selected-option');
    const options = sortBlock.querySelectorAll('.cg-sort-by-option');

    /* ===============================
       Dropdown toggle
    =============================== */
    sortBtn.addEventListener('click', e => {
      e.stopPropagation();
      sortByOptions.classList.toggle('open');
      arrow.classList.toggle('open');
    });

    document.addEventListener('click', e => {
      if (!sortBlock.contains(e.target)) {
        sortByOptions.classList.remove('open');
        arrow.classList.remove('open');
      }
    });

    /* ===============================
       Default value (first option)
    =============================== */
    if (options.length) {
      selectedOpt.textContent = options[0].textContent.trim();
    }

    /* ===============================
       Option click → sync all
    =============================== */
    options.forEach(opt => {
      opt.addEventListener('click', () => {

        // 🔹 index of clicked option
        const index = [...options].indexOf(opt);
        const value = opt.textContent.trim();

        // 🔹 update all sort blocks
        sortBlocks.forEach(block => {
          const targetOptions = block.querySelectorAll('.cg-sort-by-option');
          const targetSelected = block.querySelector('.cg-sort-by-selected-option');
          const targetDropdown = block.querySelector('.cg-sort-by-options');
          const targetArrow = block.querySelector('.cg-sort-by-dropdown-btn-arrow');

          if (!targetOptions[index]) return;

          targetSelected.textContent =
            targetOptions[index].textContent.trim();

          targetDropdown.classList.remove('open');
          targetArrow.classList.remove('open');
        });

      });
    });
  });
}

sortBy();
;

/* ============================================================================================
category page result bar sort by end
=============================================================================================*/




/* ============================================================================================
category page filter flex categories start
=============================================================================================*/

function cgFilterCategories() {
  const containers = document.querySelectorAll('.cg-filter-flex-dropdown');

  containers.forEach(container => {
    const btn = container.querySelector('.cg-filter-flex-btn');
    const menu = container.querySelector('.cg-filter-flex-menu');
    const arrow = container.querySelector('.cg-filter-flex-btn-arrow');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // close all other dropdowns
      containers.forEach(other => {
        if (other !== container) {
          other.querySelector('.cg-filter-flex-menu')?.classList.remove('open');
          other.querySelector('.cg-filter-flex-btn-arrow')?.classList.remove('open');
          other.querySelector('.cg-filter-flex-btn')?.classList.remove('open');
        }
      });

      // toggle current dropdown
      menu.classList.toggle('open');
      arrow.classList.toggle('open');
      btn.classList.toggle('open');
    });

    // close when clicking option
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('cg-sort-by-option')) {
        menu.classList.remove('open');
        arrow.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  });

  // close all when clicking outside
  document.addEventListener('click', () => {
    containers.forEach(container => {
      container.querySelector('.cg-filter-flex-menu')?.classList.remove('open');
      container.querySelector('.cg-filter-flex-btn-arrow')?.classList.remove('open');
      container.querySelector('.cg-filter-flex-btn')?.classList.remove('open');
    });
  });
}

cgFilterCategories();

/* ============================================================================================
category page filter flex categories end
=============================================================================================*/




/* ============================================================================================
category page filter flex price filter start
=============================================================================================*/

(() => {
  const priceFilters = document.querySelectorAll('.cg-filter-flex-price-filter');
  const MAX_VALUE = 500;
  const MIN_VALUE = 0; // Add a min value to clamp

  priceFilters.forEach(filter => {
    const minRange = filter.querySelector('#cg-filter-flex-minRange');
    const maxRange = filter.querySelector('#cg-filter-flex-maxRange');
    const minInput = filter.querySelector('#cg-filter-flex-minInput');
    const maxInput = filter.querySelector('#cg-filter-flex-maxInput');
    const minText = filter.querySelector('#cg-filter-flex-minText');
    const maxText = filter.querySelector('#cg-filter-flex-maxText');
    const sliderRange = filter.querySelector('#cg-filter-flex-sliderRange');
    const sliderWrapper = filter.querySelector('#cg-filter-flex-sliderWrapper');

    if (!sliderWrapper) return;

    const filterIndex = [...priceFilters].indexOf(filter);

    // 🔹 Utility to clamp values
    function clamp(value) {
      return Math.min(Math.max(value, MIN_VALUE), MAX_VALUE);
    }

    function render(min, max) {
      min = clamp(min);
      max = clamp(max);

      if (min > max) [min, max] = [max, min];

      minRange.value = min;
      maxRange.value = max;
      minInput.value = min;
      maxInput.value = max;

      minText.textContent = `$${min}`;
      maxText.textContent = `$${max}`;

      const minPercent = (min / MAX_VALUE) * 100;
      const maxPercent = (max / MAX_VALUE) * 100;

      sliderRange.style.left = minPercent + '%';
      sliderRange.style.width = (maxPercent - minPercent) + '%';

      minText.style.left = minPercent + '%';
      maxText.style.left = maxPercent + '%';
    }

    function syncAll(min, max) {
      min = clamp(min);
      max = clamp(max);

      priceFilters.forEach(block => {
        const target = block.querySelectorAll('.cg-filter-flex-price-filter')[filterIndex] || block;

        const minR = target.querySelector('#cg-filter-flex-minRange');
        const maxR = target.querySelector('#cg-filter-flex-maxRange');
        const minI = target.querySelector('#cg-filter-flex-minInput');
        const maxI = target.querySelector('#cg-filter-flex-maxInput');
        const minT = target.querySelector('#cg-filter-flex-minText');
        const maxT = target.querySelector('#cg-filter-flex-maxText');
        const range = target.querySelector('#cg-filter-flex-sliderRange');

        if (!minR) return;

        if (min > max) [min, max] = [max, min];

        minR.value = min;
        maxR.value = max;
        minI.value = min;
        maxI.value = max;

        minT.textContent = `$${min}`;
        maxT.textContent = `$${max}`;

        const minPercent = (min / MAX_VALUE) * 100;
        const maxPercent = (max / MAX_VALUE) * 100;

        range.style.left = minPercent + '%';
        range.style.width = (maxPercent - minPercent) + '%';

        minT.style.left = minPercent + '%';
        maxT.style.left = maxPercent + '%';
      });
    }

    function updateFromRanges() {
      syncAll(+minRange.value, +maxRange.value);
    }

    function updateFromInputs() {
      syncAll(+minInput.value, +maxInput.value);
    }

    minRange.addEventListener('input', updateFromRanges);
    maxRange.addEventListener('input', updateFromRanges);

    minInput.addEventListener('input', updateFromInputs);
    maxInput.addEventListener('input', updateFromInputs);

    sliderWrapper.addEventListener('click', e => {
      const rect = sliderWrapper.getBoundingClientRect();
      const value = clamp(Math.round(((e.clientX - rect.left) / rect.width) * MAX_VALUE));

      const minVal = +minRange.value;
      const maxVal = +maxRange.value;

      if (Math.abs(value - minVal) < Math.abs(value - maxVal)) {
        syncAll(value, maxVal);
      } else {
        syncAll(minVal, value);
      }
    });

    render(+minRange.value, +maxRange.value);
  });
})();


/* ============================================================================================
category page filter flex price filter end
=============================================================================================*/



/* ============================================================================================
category page filter flex brand start
=============================================================================================*/

function brandCheck() {
  const brandBlocks = document.querySelectorAll('.cg-filter-flex-brand');

  brandBlocks.forEach(brand => {
    const btns = brand.querySelectorAll('.cg-filter-flex-brand-item');

    btns.forEach(el => {
      el.addEventListener('click', () => {

        // 🔹 get index of clicked button
        const index = [...btns].indexOf(el);

        // 🔹 check current state (from clicked one)
        const isOpen = el
          .querySelector('.cg-filter-flex-brand-item-check-icon')
          .classList.toggle('open');

        // 🔹 apply same state to all brand blocks
        brandBlocks.forEach(block => {
          const targetBtn = block.querySelectorAll('.cg-filter-flex-brand-item')[index];
          if (!targetBtn) return;

          const targetCheckbox = targetBtn.querySelector(
            '.cg-filter-flex-brand-item-check-icon'
          );

          targetCheckbox.classList.toggle('open', isOpen);
        });

      });
    });
  });
}

brandCheck();


// more brand toggle
function moreBrand() {
  const brandBlocks = document.querySelectorAll('.cg-filter-flex-brand');

  brandBlocks.forEach(brand => {
    const btn = brand.querySelector('.cg-filter-flex-brand-show-more');
    const items = brand.querySelectorAll(
      '.cg-filter-flex-brand-grid > .cg-filter-flex-brand-item'
    );

    if (!btn || !items.length) return; // safety

    btn.addEventListener('click', () => {
      items.forEach(el => el.classList.toggle('open'));

      // check if at least one item is open
      const hasOpen = [...items].some(el => el.classList.contains('open'));

      btn.textContent = hasOpen ? '- Show less' : '+ Show more';
    });
  });
}

moreBrand();

/* ============================================================================================
category page filter flex brand end
=============================================================================================*/




/* ============================================================================================
category page filter flex status start
=============================================================================================*/

function sTatus() {
  const statusBlocks = document.querySelectorAll('.cg-filter-flex-status');

  statusBlocks.forEach(status => {
    const btns = status.querySelectorAll('.cg-filter-flex-status-item');

    btns.forEach(el => {
      el.addEventListener('click', () => {

        // 🔹 get index of clicked item
        const index = [...btns].indexOf(el);

        // 🔹 toggle once and store state
        const isOpen = el.classList.toggle('open');

        // 🔹 apply same state to all status blocks
        statusBlocks.forEach(block => {
          const target = block.querySelectorAll('.cg-filter-flex-status-item')[index];
          if (!target) return;

          target.classList.toggle('open', isOpen);
        });

      });
    });
  });
}

sTatus();

/* ============================================================================================
category page filter flex status end
=============================================================================================*/


/* ============================================================================================
category page end
=============================================================================================*/







