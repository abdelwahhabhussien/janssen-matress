/* ================================================================== 
STRUCTURE & RESPONSIBILITIES
- blog page pagination start - blog page pagination end
==================================================================== */



/*
============================================================================================
=============================================================================================
blog page pagination start
=============================================================================================
=============================================================================================
*/

function paginationPages() {
    const items = document.querySelectorAll('.pagination-pagination-page-number');

    // Make data-page-pagination="1" open by default
    items.forEach(el => {
        if (el.dataset.pagePagination === '1') {
            el.classList.add('open');
        }

        // Click event for each button
        el.addEventListener('click', () => {
            // Remove open from all buttons first
            items.forEach(i => i.classList.remove('open'));

            // Add open to clicked button
            el.classList.add('open');
        });
    });
}

document.addEventListener('DOMContentLoaded', paginationPages);
/*
============================================================================================
=============================================================================================
blog page pagination end
=============================================================================================
=============================================================================================
*/