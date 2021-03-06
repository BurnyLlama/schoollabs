// Here I define that the form variable should point to the actual login-form.
const form = document.querySelector("form#forgot-form");
// Get the msgbox.
const msgbox = document.querySelector(".msg-box");

// Here we define what happens when 'submit' is triggered,
form.addEventListener('submit', (event) => {
    // We construct the login information which was put in.
    const login = new FormData(form);
    const user = login.get('user');
    msgbox.innerHTML += `<p>Skickar till ${user}s epost. Om du behöver hjälp, fråga din IT-suport/administratör.</p>`;
});