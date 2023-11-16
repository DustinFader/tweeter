const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet); // Append the tweet to the container
  });
};

const createTweetElement = function (tweetData) {
  const $tweet = $(`
  <article>
  <div>
  <div>
  <img src="${tweetData.user.avatars}" alt="User Avatar">
  <h2>${tweetData.user.name}</h2>
  </div>
  <span>${tweetData.user.handle}</span>
  </div>
  <h3>${tweetData.content.text}</h3>
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

$(document).ready(function () {
  $(".tweet-button").on("submit", function (event) {
    event.preventDefault();
    const text = $(this).find("textarea").val();
    
    if (!text) {
      alert("Empty tweet");
      return;
    }

    if (text > 140) {
      alert("Tweet too long")
      return;
    }

    $.post("/tweets", $(this).serialize());
    $.get("/tweets", { method: "GET" }).then(function (data) {
      renderTweets(data);
    });
  });
});
