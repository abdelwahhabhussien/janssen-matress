/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- swiper start - swiper end
  - pagination and next prev buttons logic start - pagination and next prev buttons logic end
    - hero section pagination, next, prev buttons start - hero section pagination, next, prev buttons end
    - suggestion section pagination, next, prev buttons start - suggestion section pagination, next, prev buttons end

- horizontal scroll start - horizontal scroll end
  - for trending horizontal scroll start - for trending horizontal scroll end
==================================================================== */




/* ============================================================================================
swiper start
=============================================================================================*/

/* hero swiper start */
const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  pagination: false,
  navigation: false,

  slidesPerView: 1,
  spaceBetween: 12,

  breakpoints: {
    592: {
      slidesPerView: 1,
      spaceBetween: 25,
    }
  },
});
/* hero swiper end */

/* suggestion swiper start */
const suggestionSwiper = new Swiper(".suggestionSwiper", {
  loop: true,
  pagination: false,
  navigation: false,

  slidesPerView: 1,
  spaceBetween: 12,

  breakpoints: {
    592: {
      slidesPerView: 2,
      spaceBetween: 16,
    }
  },
});
/* suggestion swiper end */







/* pagination and next prev buttons logic start */
function attachCustomControls(swiper, swiperSection, bulletCustomClass = false) {
  const paginationContainer = swiperSection.querySelector('.swiper-custom-pagination');
  const nextButton = swiperSection.querySelector('.custom-swiper-button.next');
  const prevButton = swiperSection.querySelector('.custom-swiper-button.prev');

  if (!paginationContainer || !nextButton || !prevButton) return;

  function getRealSlides() {
    return Array.from(swiper.slides).filter(
      slide => !slide.classList.contains('swiper-slide-duplicate')
    );
  }

  function getSlidesPerView() {
    const spv = swiper.params.slidesPerView;
    return spv === 'auto' ? 1 : spv;
  }

  /* ---------------------------
     STEP-BASED PAGINATION
  ---------------------------- */
  function initPagination() {
    paginationContainer.innerHTML = '';

    const totalSlides = getRealSlides().length;
    const perView = getSlidesPerView();
    const steps = Math.max(1, totalSlides - perView + 1);

    for (let step = 0; step < steps; step++) {
      const bullet = document.createElement('button');

      // always add default class
      bullet.className = 'custom-pagination-bullet';

      // add extra class if provided
      if (bulletCustomClass) bullet.classList.add(bulletCustomClass);

      bullet.dataset.step = step;

      bullet.addEventListener('click', () => {
        swiper.params.loop
          ? swiper.slideToLoop(step)
          : swiper.slideTo(step);
      });

      paginationContainer.appendChild(bullet);
    }

    updatePagination();
  }

  function updatePagination() {
    const bullets = paginationContainer.children;
    const perView = getSlidesPerView();

    const currentStep = Math.min(swiper.realIndex, bullets.length - 1);

    [...bullets].forEach((bullet, i) => {
      bullet.classList.toggle('active', i === currentStep);
    });
  }

  /* ---------------------------
     NAVIGATION
  ---------------------------- */
  function initNavigation() {
    nextButton.addEventListener('click', () => swiper.slideNext());
    prevButton.addEventListener('click', () => swiper.slidePrev());
  }

  /* ---------------------------
     EVENTS
  ---------------------------- */
  swiper.on('realIndexChange', updatePagination);
  swiper.on('breakpoint', initPagination);
  swiper.on('resize', initPagination);

  initPagination();
  initNavigation();
}
/* pagination and next prev buttons logic end */


/* hero section pagination, next, prev buttons start */
attachCustomControls(
  heroSwiper,
  document.querySelector('.hero-section'),
  'hero-swiper-bullet'
);
/* hero section pagination, next, prev buttons end */


/* suggestion section pagination, next, prev buttons start */
attachCustomControls(
  suggestionSwiper,
  document.querySelector('.suggestion-swiper-section'),
  'suggestion-swiper-bullet'
);
/* suggestion section pagination, next, prev buttons end */






/* ============================================================================================
swiper end
=============================================================================================*/




















