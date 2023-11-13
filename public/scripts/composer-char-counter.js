$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const textLength = $(this).val().length;
    const maxLength = 140;
    const counterValue = maxLength - textLength;
    const counter = this.parentNode.counter;
    $(counter).val(counterValue);
    if (counterValue < 0) {
      $(counter).addClass('over-limit');
    }
    if (counterValue >= 0) {
      $(counter).removeClass('over-limit');
    }
  });
});