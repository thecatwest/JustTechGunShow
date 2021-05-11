// delete post handler
async function deleteFormEventHandler(event) {
  event.preventDefault();
  // set id variable, convert to string, use '/' to split into array
  const id = window.location.toString().split("/")[
    // select last post
    window.location.toString().split("/").length - 1
  ];
  // get post by id
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  // if delete method req is successful
  if (response.ok) {
    // redirect user to dashboard
    document.location.replace("/dashboard/");
    //   if req unsuccessful, throw error alert
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormEventHandler);
