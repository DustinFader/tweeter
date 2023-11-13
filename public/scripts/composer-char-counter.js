$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const textLength = $(this).val().length;
    const maxLength = 140;
    $(this.parentNode.counter).val(maxLength - textLength);
    if (maxLength - textLength < 0) {
      $(this.parentNode.counter).addClass('over-limit');
    }
    if (maxLength - textLength >= 0) {
      $(this.parentNode.counter).removeClass('over-limit');
    }
  });
});