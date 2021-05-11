async function commentFormEventHandler(event) {
  event.preventDefault();

  // declare text area element variable for comment
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  // declare post id variable from url
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
// if comment text exists (prevents empty comment field)
  if (comment_text) {
    const response = await fetch("/api/comments", {
    // post method for body properties for post id and comment
        method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if the response is okay, reload
    if (response.ok) {
      document.location.reload();
    // otherwise, throw status alert
    } else {
      alert(response.statusText);
    }
  }
}

// add event to listen for submit comment for click
document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormEventHandler);
