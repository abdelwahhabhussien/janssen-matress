/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- payment Option select
==================================================================== */



/* ============================================================================================
  payment Option select start
=============================================================================================*/


function paymentOption() {
  const items = document.querySelectorAll('.payment-item');
  const creditCardForm = document.querySelector('.payment-item-credit-card-form');

  // 1️⃣ DEFAULT: open item with data-item="2" if nothing is open
  let hasOpen = false;

  items.forEach(item => {
    const dot = item.querySelector('.payment-check-box-dot');
    if (dot.classList.contains('open')) {
      hasOpen = true;
    }
  });

  if (!hasOpen) {
    items.forEach(item => {
      if (item.dataset.item === '2') {
        item.querySelector('.payment-check-box-dot').classList.add('open');
        creditCardForm.classList.add('open');
      }
    });
  }

  // 2️⃣ CLICK LOGIC
  items.forEach(item => {
    const btn = item.querySelector('.payment-option-btn');
    const dot = item.querySelector('.payment-check-box-dot');

    btn.addEventListener('click', () => {

      // remove open from all dots & form
      items.forEach(i => {
        i.querySelector('.payment-check-box-dot').classList.remove('open');
      });
      creditCardForm.classList.remove('open');

      // add open to clicked item
      dot.classList.add('open');

      // special case: item 2 → open form
      if (item.dataset.item === '2') {
        creditCardForm.classList.add('open');
      }
    });
  });
}

paymentOption();


/* ============================================================================================
  payment Option select end
=============================================================================================*/




function subMitPopUp() {
  const btn = document.querySelector('.payment-submit-btn');
  const closeBtn = document.querySelector('.thank-you-ok-btn');

  btn.addEventListener('click', () => {
    document.querySelector('.payment-thank-you-popup').classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    document.querySelector('.payment-thank-you-popup').classList.remove('open');
  });
}

subMitPopUp();