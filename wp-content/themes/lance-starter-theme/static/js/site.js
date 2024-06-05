// ========================================================================== //
// ~ SITE scripts
// // JS/jQuery script for this site.
// ========================================================================== //

jQuery(document).ready(function($) {

// ========================================================================== //
// Testimonials slider
// component/testimonials-slider.twig
// ========================================================================== //

$('#testimonials-slider').slick({ // .column-slider
  mobileFirst: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  prevArrow: $('#testimonials__prev-arrow'),
  nextArrow: $('#testimonials__next-arrow'),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }
  ]
});

// ========================================================================== //
// Toggle
// ========================================================================== //

$(".toggle").click(function() {
  const container = $(this).parent(".toggle_container");
  const isOpen = container.hasClass("open");
  $(this).parent(".toggle_container").toggleClass("open");
  $(this).attr("aria-expanded", function (i, attr) {
    return attr == "true" ? "false" : "true"
  });
  if (isOpen) {
    $(this).blur();
  }
});

// open with Enter key
$(".toggle").keydown(function(e) {
  if ($(this).is(":focus")) {
    if (e.key === "Enter") {
      e.preventDefault();
      $(this).click();
    }
  }
});

// lose focus on close with mouse click
$(".toggle").mousedown(function(event) {
  const container = $(this).parent(".toggle_container");
  const isOpen = container.hasClass("open");
  if (event.which !== 1) {
    return;
  }
  if (isOpen) {
    $(this).blur();
  }
});
    
}); // End jQuery