/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- anker tag trigger prevent
==================================================================== */






/*
============================================================================================
anker tag trigger prevent start
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
aPreventdefault('.wishlist-cart-wishlist-view-button');

/*
============================================================================================
anker tag trigger prevent end
=============================================================================================
*/
