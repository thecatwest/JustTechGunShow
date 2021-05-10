// event handler to call /logout route in user-routes.js
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        // if successfully logged out, return to homepage
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// add event listener to listen for 'click' on logout button
document.querySelector('#logout').addEventListener('click', logout);