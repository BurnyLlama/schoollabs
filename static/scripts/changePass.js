// Define some constants to point to different elements.
const changePassForm = document.querySelector('#change-pass-form');
const oldPass = changePassForm.querySelector('#old-pass');
const newPass = changePassForm.querySelector('#new-pass');
const repeatPass = changePassForm.querySelector('#rep-pass');
const status = changePassForm.querySelector('p#status');
const submit = changePassForm.querySelector('input[type=submit]')

function changePassChecker() {
    if (!oldPass.value) {
        status.innerHTML = "Du måste ange det gamla lösenord!";
        return submit.disabled = true;
    };
    if (newPass.value != repeatPass.value) {
        status.innerHTML = "Lösenorden stämmer inte överens!";
        return submit.disabled = true;
    };
    if (newPass.value === repeatPass.value) {
        status.innerHTML = "Allt verkar okej! Klicka på knappen om du vill ändra lösenord.";
        return submit.disabled = false;
    };
}
