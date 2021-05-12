// edit post handler
async function editFormEventHandler(event) {
  event.preventDefault();
  // set variables for title and id
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const id = window.location.toString().split("/")[
    // split url using / and make array
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // if edit put req is successful
  if (response.ok) {
    // redirect user to dashboard
    document.location.replace("/dashboard");
    // req is unsuccessful, throw error alert
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormEventHandler);
