// ========================================================================== //
// ~ Page: HOME scripts
// ========================================================================== //

jQuery(document).ready(function($) {

console.log('page-home.js');

// ========================================================================== //
// Hero
// ========================================================================== //

var words = ["business", "career", "lifestyle"];
var index = 0;

function cycleWords() {
  var $word = $(".cycle-word");
  $word
  .text(words[index])
  .css("animation-name", "fadeInUp")
  .one("animationend", function() {
    setTimeout(function() {
      $word.css("animation-name", "fadeOutUp").one("animationend", function() {
        index = (index + 1) % words.length;
        cycleWords();
      });
    }, 5000); // Adjust the delay as needed
  });
}

function checkScreenWidth() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    cycleWords();
  }
}

// Run the function on page load
checkScreenWidth();

// Run the function on window resize
$(window).resize(checkScreenWidth);

// ========================================================================== //
// Fast Facts
// ========================================================================== //

$('ol.facts__repeater li.item').on('click', function() {
  var count = $(this).data('count');
  $('.item--active').removeClass('item--active');
  $(this).addClass('item--active');
  $('ol.facts__repeater-images li.item[data-count="' + count + '"]').addClass('item--active');
});

// ========================================================================== //
// News slider
// ========================================================================== //

// $('#news-slider').slick({
//   mobileFirst: true,
//   dots: false,
//   centerMode: false,
//   infinite: false,
//   prevArrow: $('#news-prev'),
//   nextArrow: $('#news-next'),
//   slidesToShow: 1,
//   responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2
//       }
//     },
//     {
//       breakpoint: 1280,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3
//       }
//     }
//   ]
// });

}); // End jQuery