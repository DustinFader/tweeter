const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet); // Append the tweet to the container
  });
};

// prevents input from altering the website.
const escap = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <article>
    <div class="tweet-header">
      <div>
        <img src="${tweetData.user.avatars}" alt="User Avatar">
        <h2>${tweetData.user.name}</h2>
      </div>
      <span>${tweetData.user.handle}</span>
    </div>
    <h3>${escap(tweetData.content.text)}</h3>
    <hr>
    <div>
      <p>${timeago.format(new Date(tweetData.created_at))}</p>
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


$(document).ready(function() {
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: function(data) {
        renderTweets(data);
      },
      error: (err) => {
        console.log('Rendering tweets has failed', err);
      }
    });
  };

  loadTweets();

  $(".tweet-button").on("submit", function(event) {
    event.preventDefault();
    loadTweets();
    const textLength = $(this).find("textarea").val().length;
    if (!textLength) {
      $(".error").slideDown("slow", () => {
        $(".error").val("Can't tweet an empty tweet");
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

    // posts user input into new tweet and resets
    $.post("/tweets", $(this).serialize()).done(() => {
      loadTweets();
      $(this).find("textarea").val("");
      $(this).find("output").val(140);
    });
  });
});