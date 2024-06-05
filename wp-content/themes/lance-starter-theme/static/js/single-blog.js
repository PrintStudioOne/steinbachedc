// ========================================================================== //
// ~ Single blog entry scripts
// // JS/jQuery script for single blog entries.
// ========================================================================== //

jQuery(document).ready(function($) {

// ========================================================================== //
// Blog progress bar
// ========================================================================== //

$(document).on('scroll', function() {
  const entryOffset = $('#entry').offset().top;
  const entryHeight = $('#entry').height();
  const scrollTop = $(this).scrollTop() - entryOffset;
  const scrollHeight = entryHeight - $(window).height();
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  $('#blog-progress-bar').css('width', scrollProgress + '%');
});

}); // End jQuery