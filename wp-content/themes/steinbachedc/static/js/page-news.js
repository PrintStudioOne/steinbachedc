// ========================================================================== //
// ~ Page: NEWS scripts
// ========================================================================== //

jQuery(document).ready(function($) {

console.log('page-news.js');

// ========================================================================== //
// News search
// ========================================================================== //

$('#search').on('keyup', function() {
  var value = $(this).val().toLowerCase();
  $('button.filter__button[data-filter="all"]').click();
  $('article.news__article').filter(function() {
    $(this).toggle($(this).find('h2').text().toLowerCase().indexOf(value) > -1 || $(this).attr('data-filter').toLowerCase().indexOf(value) > -1);
  });
});

// ========================================================================== //
// News filter
// ========================================================================== //

$('button.filter__button').click(function() {
  var filter = $(this).attr('data-filter');
  $('button.filter__button').removeClass('button--active');
  $(this).addClass('button--active');

  if (filter === 'all') {
    $('article.news__article').show();
  } else {
    $('article.news__article').hide().filter(function() {
      var filters = $(this).attr('data-filter').split(' ');
      return filters.includes(filter);
    }).show();
  }
  return false;
});

}); // End jQuery