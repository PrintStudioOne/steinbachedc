// ========================================================================== //
// ~ SITE scripts
// JS/jQuery script for this site.
// ========================================================================== //

jQuery(document).ready(function($) {

console.log('site.js');

// ========================================================================== //
// Toggle
// ========================================================================== //

$("button.toggle__button").click(function() {
  const container = $(this).parent(".toggle_container");
  const isOpen = container.hasClass("toggle--open");
  $(this).parent(".toggle_container").toggleClass("toggle_container--open");
  $(this).attr("aria-expanded", function (i, attr) {
    return attr == "true" ? "false" : "true"
  });
  if (isOpen) {
    $(this).blur();
  }
});

// Open with Enter key
$("button.toggle__button").keydown(function(e) {
  if ($(this).is(":focus")) {
    if (e.key === "Enter") {
      e.preventDefault();
      $(this).click();
    }
  }
});

// Lose focus on close with mouse click
$("button.toggle__button").mousedown(function(event) {
  const container = $(this).parent(".toggle_container");
  const isOpen = container.hasClass("toggle_container--open");
  if (event.which !== 1) {
    return;
  }
  if (isOpen) {
    $(this).blur();
  }
});

}); // End jQuery