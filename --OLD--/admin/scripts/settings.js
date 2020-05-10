function showSettings() {
    const container = document.querySelector('#settings-container');
    container.style.display = "grid";
    if (user.theme == "dark") document.querySelector('input#dark').checked = true;
    if (user.theme == "light") document.querySelector('input#light').checked = true;
}
function closeSettings() {
    const container = document.querySelector('#settings-container');
    container.style.display = "none";
}
