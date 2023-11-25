const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet); // Append the tweet to the container
  });
};

const escap = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function (tweetData) {
  const $tweet = $(`
  <article>
    <div class="tweet-header">
      <div>
        <img src="${escap(tweetData.user.avatars)}" alt="User Avatar">
        <h2>${escap(tweetData.user.name)}</h2>
      </div>
      <span>${escap(tweetData.user.handle)}</span>
    </div>
    <h3>${escap(tweetData.content.text)}</h3>
    <hr>
    <div>
      <p>${escap(timeago.format(new Date(tweetData.created_at)))}</p>
      <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart-circle-plus"></i>
      </div>
    </div>
  </article>
  `);
  return $tweet;
};


$(document).ready(function () {
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: function (data) {
        renderTweets(data)
      },
      error: (err) => { console.log('Rendering tweets has failed', err) }
    })
  }
  loadTweets();
  $(".tweet-button").on("submit", function (event) {
    event.preventDefault();
    loadTweets();
    const textLength = $(this).find("textarea").val().length;
    if (!textLength) {
      $(".error").slideDown("slow", () => {
        $(".error").val("Cant tweet an empty tweet");
      });
      return;
    } else if (textLength > 140) {
      $(".error").slideDown("slow", () => {
        $(".error").val("Tweet too long, has to be below 140 characters");
      });
      return;
    } else {
      $(".error").slideUp("slow");
    }

    $.post("/tweets", $(this).serialize()).done(() => { loadTweets(); });
  });
});