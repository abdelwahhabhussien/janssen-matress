/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- header start - header end

  - dropdown start - dropdown end

  - header shadow on scroll start - header shadow on scroll end

  - sidebar toggle start - sidebar toggle end

  - cart counting start - cart counting end

  - menu dropdown toggle start - menu dropdown toggle end

- horizontal drag scroll start - horizontal drag scroll end

- anker tag trigger prevent start - anker tag trigger prevent end
==================================================================== */


/* ============================================================================================
header start
=============================================================================================*/


/* ============================================================================================
dropdown start
=============================================================================================*/
function hover(dropdown, dropdownbtn, dropdownoverlay, dropdownmenu, arrowSelector) {

  const dropdowns = document.querySelectorAll(dropdown);

  dropdowns.forEach(dropdown => {

    const btn = dropdown.querySelector(dropdownbtn);
    const overlay = dropdown.querySelector(dropdownoverlay);
    const menu = dropdown.querySelector(dropdownmenu);
    const arrow = dropdown.querySelector(arrowSelector);

    const finePointerMQ = window.matchMedia("(pointer: fine)");
    const coarsePointerMQ = window.matchMedia("(pointer: coarse)");

    const open = () => {
      overlay.classList.add('open');
      menu.classList.add('open');
      arrow.classList.add('open');
    };

    const close = () => {
      overlay.classList.remove('open');
      menu.classList.remove('open');
      arrow.classList.remove('open');
    };

    /* =============================
       CLEANUP HANDLERS
    ============================== */

    let hoverCleanup = () => { };
    let clickCleanup = () => { };

    /* =============================
       DESKTOP (FINE POINTER)
    ============================== */

    const enableHoverMode = () => {
      let inside = false;

      const enter = () => {
        inside = true;
        open();
      };

      const leave = () => {
        inside = false;
        setTimeout(() => {
          if (!inside) close();
        }, 0);
      };

      [btn, overlay, menu].forEach(el => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });

      hoverCleanup = () => {
        [btn, overlay, menu].forEach(el => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
      };
    };

    /* =============================
       TOUCH (COARSE POINTER)
    ============================== */

    const enableClickMode = () => {
      let opened = false;

      const btnClick = (e) => {
        e.stopPropagation();

        if (!opened) {
          document.querySelectorAll('.open').forEach(el => el.classList.remove('open'));
          open();
          opened = true;
        } else {
          close();
          opened = false;
        }
      };

      const menuClick = (e) => e.stopPropagation();

      const docClick = () => {
        close();
        opened = false;
      };

      btn.addEventListener('click', btnClick);
      menu.addEventListener('click', menuClick);
      document.addEventListener('click', docClick);

      clickCleanup = () => {
        btn.removeEventListener('click', btnClick);
        menu.removeEventListener('click', menuClick);
        document.removeEventListener('click', docClick);
      };
    };

    /* =============================
       MODE SWITCHER (LIKE CSS)
    ============================== */

    const applyPointerMode = () => {
      hoverCleanup();
      clickCleanup();
      close();

      if (finePointerMQ.matches) enableHoverMode();
      if (coarsePointerMQ.matches) enableClickMode();
    };

    // Initial run
    applyPointerMode();

    // React to pointer changes (JUST LIKE CSS)
    finePointerMQ.addEventListener('change', applyPointerMode);
    coarsePointerMQ.addEventListener('change', applyPointerMode);

  });
}

hover('.dropdown', '.dropdown-btn', '.dropdown-overlay', '.dropdown-menu', '.arrow');

/* ============================================================================================
dropdown end
=============================================================================================*/





/* ============================================================================================
header shadow on scroll start
=============================================================================================*/
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const headerHeight = header.offsetHeight;

  if (window.scrollY > headerHeight) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

/* ============================================================================================
header shadow on scroll end
=============================================================================================*/





/* ============================================================================================
sidebar toggle start
=============================================================================================*/
function toggle(siebarContainers, sidebars, sidebarBtns, sidebarOverlays, sidebarCloseBtns) {
  const sideBarCons = document.querySelectorAll(siebarContainers);
  sideBarCons.forEach(el => {
    const sidebar = el.querySelector(sidebars);
    const sidebarBtn = el.querySelector(sidebarBtns);
    const sidebarOverlay = el.querySelector(sidebarOverlays);
    const sidebarCloseBtn = el.querySelector(sidebarCloseBtns);


    sidebarBtn.addEventListener('click', () => {

      if (!(sidebar.classList.contains('open')) && !(sidebarOverlay.classList.contains('open'))) {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
      }
      else {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      }
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });

    sidebarCloseBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });

    // history.pushState(null, null, location.href);
    // window.addEventListener('popstate', () => {
    //   sidebar.classList.remove('open');
    //   sidebarOverlay.classList.remove('open');
    // });

  });
}
toggle(

  '.sidebar-containers',
  '.sidebar',
  '.sidebar-btn',
  '.sidebar-overlay',
  '.sidebar-close-btn'

)

toggle(

  '.search-bar-container',
  '.search-sidebar',
  '.search-btn',
  '.searchbar-overlay',
  '.searchbar-close-btn'

)


const liveSidebarScroll = ({ sidebarsSelector }) => {
  const html = document.documentElement;
  const body = document.body;

  const check = () => {
    const elements = document.querySelectorAll(sidebarsSelector);
    if (!elements.length) return;

    const anyOpen = [...elements].some(el => {
      // 🔥 EXTRA CONDITION ONLY
      const parent = el.parentElement;
      if (parent && parent.offsetParent === null) {
        return false; // parent is display:none → ignore open
      }

      // ✅ ORIGINAL LOGIC (unchanged)
      return el.classList.contains('open');
    });

    if (anyOpen) {
      const scrollWidth = window.innerWidth - html.clientWidth;
      html.style.overflow = 'hidden';

      if (scrollWidth > 0) {
        body.style.paddingRight = `${scrollWidth}px`;
      }
    } else {
      html.style.overflow = '';
      body.style.paddingRight = '';
    }
  };

  check();
  setInterval(check, 100);
};

liveSidebarScroll({
  sidebarsSelector: `
    .sidebar,
    .search-sidebar,
    .review-form-div
  `
});
// here review-buttons from product page

/* ============================================================================================
sidebar toggle end
=============================================================================================*/




/* ============================================================================================
cart counting start
=============================================================================================*/
function cartCounter(cartItem, cartMinusBtn, cartPlusBtn, cartCountInput) {
  const cartItems = document.querySelectorAll(cartItem);

  cartItems.forEach(el => {
    const minusBtn = el.querySelector(cartMinusBtn);
    const plusBtn = el.querySelector(cartPlusBtn);
    const countInput = el.querySelector(cartCountInput);

    if (!minusBtn || !plusBtn || !countInput) return;

    const min = countInput.hasAttribute('min')
      ? parseInt(countInput.min, 10)
      : 1;

    const max = countInput.hasAttribute('max')
      ? parseInt(countInput.max, 10)
      : 20;

    // 🔁 keep UI in sync
    function updateUI(value) {
      countInput.value = value;
      minusBtn.disabled = value <= min;
      plusBtn.disabled = value >= max;
    }

    // initial state
    updateUI(parseInt(countInput.value, 10) || min);

    // Minus
    minusBtn.addEventListener('click', () => {
      let value = parseInt(countInput.value, 10) || min;
      if (value > min) updateUI(value - 1);
    });

    // Plus
    plusBtn.addEventListener('click', () => {
      let value = parseInt(countInput.value, 10) || min;
      if (value < max) updateUI(value + 1);
    });

    // Manual typing
    countInput.addEventListener('input', () => {
      if (countInput.value === "") return;

      let value = parseInt(countInput.value, 10);

      if (isNaN(value)) value = min;
      if (value < min) value = min;
      if (value > max) value = max;

      updateUI(value);
    });

    // On blur → never allow empty
    countInput.addEventListener('blur', () => {
      if (countInput.value === "") updateUI(min);
    });
  });
}

cartCounter(
  '.cart-item',
  '.minus-btn',
  '.plus-btn',
  '.count-input'
);

/* ============================================================================================
cart counting end
=============================================================================================*/





/* ============================================================================================
menu dropdown toggle start
=============================================================================================*/

function menuSidebarDropdown(dropdown, dropdownBtn, dropdownMenu, dropdownArrow) {
  const dropdowns = document.querySelectorAll(dropdown);

  dropdowns.forEach(el => {
    const btn = el.querySelector(dropdownBtn);
    const menu = el.querySelector(dropdownMenu);
    const arrow = el.querySelector(dropdownArrow);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = menu.classList.contains('open');

      // Close all dropdowns first
      dropdowns.forEach(otherEl => {
        otherEl.querySelector(dropdownMenu)?.classList.remove('open');
        otherEl.querySelector(dropdownArrow)?.classList.remove('open');
      });

      // Toggle only the clicked one
      if (!isOpen) {
        menu.classList.add('open');
        arrow.classList.add('open');
      }
    });
  });

  // ONE global click handler
  document.addEventListener('click', () => {
    dropdowns.forEach(el => {
      el.querySelector(dropdownMenu)?.classList.remove('open');
      el.querySelector(dropdownArrow)?.classList.remove('open');
    });
  });
}

menuSidebarDropdown(
  '.menu-dropdown',
  '.menu-dropdown-btn',
  '.menu-dropdown-menu',
  '.menu-dropdown-btn .arrow svg'
);
/* ============================================================================================
menu dropdown toggle end
=============================================================================================*/

/* ============================================================================================
header end
=============================================================================================*/





















/*
============================================================================================
=============================================================================================
horizontal drag scroll start
=============================================================================================
=============================================================================================
*/

/* for trending horizontal scroll start */
function horslider(selector) {
  const slider = document.querySelector(selector);
  if (!slider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // CSS-like breakpoint
  const smallScreen = window.matchMedia('(max-width: 1000px)');

  /* 🔴 stop anchor drag only under 1000px */
  slider.addEventListener('dragstart', (e) => {
    if (smallScreen.matches && e.target.closest('a')) {
      e.preventDefault();
    }
  });

  slider.addEventListener('mousedown', (e) => {
    if (!smallScreen.matches) return;

    isDown = true;
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown || !smallScreen.matches) return;

    e.preventDefault();
    const walk = e.pageX - startX;
    slider.scrollLeft = scrollLeft - walk;
  });
}

horslider('.trending-item-container');
/* for trending horizontal scroll end */

/*
============================================================================================
=============================================================================================
horizontal drag scroll end
=============================================================================================
=============================================================================================
*/










/*
============================================================================================
=============================================================================================
anker tag trigger prevent start
=============================================================================================
=============================================================================================
*/


function aPreventdefault(e) {
  document.querySelectorAll(e).forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Wishlist clicked');
    });
  });
}
aPreventdefault('.product-cart-wishlist-add-btn');
aPreventdefault('.trending-cart-wishlist-add-btn')


/*
============================================================================================
=============================================================================================
anker tag trigger prevent end
=============================================================================================
=============================================================================================
*/

