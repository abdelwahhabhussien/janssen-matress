/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- product page start - product page end
  - product page image switch
  - product page image zoom
  - product page details and review switching
  - product page price count
  - product page review form open and close
  - product page review Star rating logic

==================================================================== */











/* ============================================================================================
product page start
=============================================================================================*/


/* ============================================================================================
product page image switch start
=============================================================================================*/

function productImageSwitch() {
  const mainImage = document.getElementById("mainProductImage");
  const variants = document.querySelectorAll(".product-column-variant");

  variants.forEach(variant => {
    variant.addEventListener("click", () => {

      // Active border
      variants.forEach(v => v.classList.remove("active"));
      variant.classList.add("active");

      // Smooth image switch
      mainImage.style.opacity = "0";

      setTimeout(() => {
        mainImage.src = variant.dataset.img;
        mainImage.style.opacity = "1";
      }, 0);
    });
  });
}

productImageSwitch();


/* ============================================================================================
product page image switch start
=============================================================================================*/





/* ============================================================================================
product page image zoom start
=============================================================================================*/

function productImageOpen() {
  const mainImage = document.querySelector(".product-column-image img");
  const zoomBox = document.querySelector(".product-image-zoom");
  const zoomImage = zoomBox.querySelector("img");
  const closeBtn = zoomBox.querySelector("button");

  // open
  mainImage.addEventListener("click", () => {
    zoomImage.src = mainImage.src;
    zoomBox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // click anywhere to close
  zoomBox.addEventListener("click", closeViewer);

  // close button (optional, but still works)
  closeBtn.addEventListener("click", closeViewer);

  function closeViewer() {
    zoomBox.style.display = "none";
    document.body.style.overflow = "";
  }
}

productImageOpen();
/* ============================================================================================
product page image zoom end
=============================================================================================*/


/* ============================================================================================
product page details and review switching start
=============================================================================================*/

function productDeRev() {
  const detailsBtn = document.querySelector('.product-section2-details-btn');
  const reviewsBtn = document.querySelector('.product-section2-reviews-btn');

  const details = document.querySelector('.product-section-details');
  const reviews = document.querySelector('.product-section-reviews');

  const detailsOverlay = document.querySelector('.product-section2-details-btn-overlay');
  const reviewsOverlay = document.querySelector('.product-section2-reviews-btn-overlay');

  // Default active state
  if (!reviews.classList.contains('active')) {
    detailsOverlay.classList.add('active');
    details.classList.add('active');
  }

  // Reviews button click
  reviewsBtn.addEventListener('click', () => {
    if (!reviews.classList.contains('active')) {
      details.classList.remove('active');
      detailsOverlay.classList.remove('active');

      reviews.classList.add('active');
      reviewsOverlay.classList.add('active');
    }
  });

  // Details button click
  detailsBtn.addEventListener('click', () => {
    if (!details.classList.contains('active')) {
      reviews.classList.remove('active');
      reviewsOverlay.classList.remove('active');

      details.classList.add('active');
      detailsOverlay.classList.add('active');
    }
  });

  // Details hover
  detailsBtn.addEventListener('mouseover', () => {
    if (!details.classList.contains('active')) {
      detailsOverlay.classList.add('active');
      reviewsOverlay.classList.remove('active');
    }
  });

  detailsBtn.addEventListener('mouseout', () => {
    if (!details.classList.contains('active')) {
      detailsOverlay.classList.remove('active');
      reviewsOverlay.classList.add('active');
    }
  });

  // Reviews hover
  reviewsBtn.addEventListener('mouseover', () => {
    if (!reviews.classList.contains('active')) {
      detailsOverlay.classList.remove('active');
      reviewsOverlay.classList.add('active');
    }
  });

  reviewsBtn.addEventListener('mouseout', () => {
    if (!reviews.classList.contains('active')) {
      detailsOverlay.classList.add('active');
      reviewsOverlay.classList.remove('active');
    }
  });
}

productDeRev();


/* ============================================================================================
product page details and review switching end
=============================================================================================*/


/* ============================================================================================
product page price count start
=============================================================================================*/
function productCounter(
  productItem,
  productMinusBtn,
  productPlusBtn,
  productCountInput
) {
  const productItems = document.querySelectorAll(productItem);

  productItems.forEach(el => {
    const minusBtn = el.querySelector(productMinusBtn);
    const plusBtn = el.querySelector(productPlusBtn);
    const countInput = el.querySelector(productCountInput);

    // ⛔ stop if any element is missing
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

    // Initial state
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

    // Never leave input empty
    countInput.addEventListener('blur', () => {
      if (countInput.value === "") updateUI(min);
    });
  });
}

productCounter(
  '.product-count',
  '.product-minus-btn',
  '.product-plus-btn',
  '.product-count-input'
);

/* ============================================================================================
product page price count end
=============================================================================================*/





/* ============================================================================================
product page review form open and close start
=============================================================================================*/

function reviewFormToggle() {
  const reviewBtn = document.querySelector('#review-buttons-form-open-btn');
  const reviewFormDiv = document.querySelector('.review-form-div');
  const reviewForm = document.querySelector('.review-form-wrapper');
  const reviewCloseBtn = document.querySelector('.review-form-close-btn');
  const reviewCancelBtn = document.querySelector('.review-cancel-btn');

  if (!reviewBtn || !reviewFormDiv || !reviewForm) return;

  const closeForm = () => {
    reviewFormDiv.classList.remove('open');
  };

  // open
  reviewBtn.addEventListener('click', () => {
    reviewFormDiv.classList.add('open');
  });

  // close buttons (X and Cancel)
  reviewCloseBtn?.addEventListener('click', closeForm);
  reviewCancelBtn?.addEventListener('click', closeForm);

  // click outside form → close
  reviewFormDiv.addEventListener('click', () => {
    if (reviewFormDiv.classList.contains('open')) {
      closeForm();
    }
  });

  // prevent close when clicking inside form
  reviewForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// call function
reviewFormToggle();
/* ============================================================================================
product page review form open and close end
=============================================================================================*/




/* ============================================================================================
product page review Star rating logic start
=============================================================================================*/

const stars = document.querySelectorAll('#stars span');
const ratingInput = document.getElementById('rating');

stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    ratingInput.value = value;

    stars.forEach(s => {
      s.classList.toggle(
        'active',
        s.getAttribute('data-value') <= value
      );
    });
  });
});
/* ============================================================================================
product page review Star rating logic end
=============================================================================================*/



/* ============================================================================================
product page end
=============================================================================================*/



