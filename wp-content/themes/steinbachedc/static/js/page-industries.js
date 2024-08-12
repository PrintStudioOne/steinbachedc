// ========================================================================== //
// ~ Page: INDUSTRIES scripts
// ========================================================================== //

jQuery(document).ready(function($) {

console.log('page-industries.js');

// ========================================================================== //
// Stories
// ========================================================================== //

function checkWidth() {
  $(window).on('scroll', function() {
    let maxVisibleHeight = 0;
    let activeElement = null;

    $('ol.stories__repeater li.item').each(function() {
      let element = $(this);
      let elementTop = element.offset().top;
      let elementBottom = elementTop + element.outerHeight();
      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      let visibleTop = Math.max(elementTop, viewportTop);
      let visibleBottom = Math.min(elementBottom, viewportBottom);
      let visibleHeight = visibleBottom - visibleTop;

      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        activeElement = element;
      }
    });

    if (activeElement) {
      $('ol.stories__repeater--legend li.item').removeClass('item--active');
      let dataId = activeElement.data('id');
      $('ol.stories__repeater--legend li.item[data-id="' + dataId + '"]').addClass('item--active');
    }
  });
}

checkWidth();
$(window).resize(checkWidth);
  
}); // End jQuery