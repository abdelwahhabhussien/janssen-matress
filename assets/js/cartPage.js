/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- product page price count 
==================================================================== */




/* ============================================================================================
product page price count start
=============================================================================================*/

function productCounter(
  parentSelector,
  productItem,
  productMinusBtn,
  productPlusBtn,
  productCountInput
) {
  const parents = document.querySelectorAll(parentSelector);

  parents.forEach(parent => {
    const productItems = parent.querySelectorAll(productItem);

    if (!productItems.length) return;

    // Get min/max from first input (assume same for all)
    const firstInput = productItems[0].querySelector(productCountInput);

    const min = firstInput?.hasAttribute("min")
      ? parseInt(firstInput.min, 10)
      : 1;

    const max = firstInput?.hasAttribute("max")
      ? parseInt(firstInput.max, 10)
      : 20;

    // 🔁 shared update for all items in this parent
    function updateAll(value) {
      productItems.forEach(el => {
        const minusBtn = el.querySelector(productMinusBtn);
        const plusBtn = el.querySelector(productPlusBtn);
        const input = el.querySelector(productCountInput);

        if (!minusBtn || !plusBtn || !input) return;

        input.value = value;
        minusBtn.disabled = value <= min;
        plusBtn.disabled = value >= max;
      });
    }

    // Initial value (from first input)
    let sharedValue = parseInt(firstInput.value, 10) || min;
    updateAll(sharedValue);

    // Attach events
    productItems.forEach(el => {
      const minusBtn = el.querySelector(productMinusBtn);
      const plusBtn = el.querySelector(productPlusBtn);
      const input = el.querySelector(productCountInput);

      if (!minusBtn || !plusBtn || !input) return;

      // Minus
      minusBtn.addEventListener("click", () => {
        if (sharedValue > min) {
          sharedValue--;
          updateAll(sharedValue);
        }
      });

      // Plus
      plusBtn.addEventListener("click", () => {
        if (sharedValue < max) {
          sharedValue++;
          updateAll(sharedValue);
        }
      });

      // Manual typing
      input.addEventListener("input", () => {
        if (input.value === "") return;

        let value = parseInt(input.value, 10);
        if (isNaN(value)) value = min;
        if (value < min) value = min;
        if (value > max) value = max;

        sharedValue = value;
        updateAll(sharedValue);
      });

      // Never leave empty
      input.addEventListener("blur", () => {
        if (input.value === "") {
          sharedValue = min;
          updateAll(sharedValue);
        }
      });
    });
  });
}
productCounter(
  ".cart-page-item",
  ".product-count",
  ".product-minus-btn",
  ".product-plus-btn",
  ".product-count-input"
);

/* ============================================================================================
product page price count end
=============================================================================================*/


