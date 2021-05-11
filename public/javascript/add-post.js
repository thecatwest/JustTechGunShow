async function newFormEventHandler(event) {
    event.preventDefault();

    // set title variable to grab post-title
    const title = document.querySelector('input[name="post-title"]').value;
    // set post_url variable to grab post-url
    const post_url = document.querySelector('input[name="post-url"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // if post req is successful, redirect to dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    // if req is unsuccessful, throw error text
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormEventHandler);