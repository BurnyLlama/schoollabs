// Here I define that the form variable should point to the actual login-form.
const form = document.querySelector("form#login-form");
// Get the msgbox.
const msgbox = document.querySelector(".msg-box");
// Get the API...
const API = 0;


// Here we define what happens when 'submit' is triggered,
form.addEventListener('submit', (event) => {
    // We need to prevent the default behaviour, we want to add our own.
    event.preventDefault();

    // We construct the login information which was put in.
    const login = new FormData(form);
    const user = login.get('user');
    const pass = login.get('pass');
    msgbox.style.display = 'block';
    msgbox.innerHTML += `<p>Loggar in som ${user}</p>`;
});