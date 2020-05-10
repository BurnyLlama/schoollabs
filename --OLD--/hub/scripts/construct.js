// Construct the basic place and add some CSS-Variables.
function construct() {
    // Set the first name of the user to the avatar "image"
    const avatar = document.querySelector('#avatar-letter');
    avatar.innerHTML = user.name.charAt(0);
    // Random color for avatar
    const avatarBg = document.querySelector('#avatar-bg').style;
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const avatarBgColor = `rgb(${red}, ${green}, ${blue})`;
    avatarBg.background = avatarBgColor;

    // Select the "root"-element of the HTML Document, 
    // then add varaibles depending on the user's theme
    const root = document.documentElement.style;
    if (user.theme == "light") {
        root.setProperty("--bg-clr", "#ffffff");
        root.setProperty("--mbg-clr", "#eeeeee"); 
        root.setProperty("--mg-clr", "#888888");
        root.setProperty("--mfg-clr", "#111111");
        root.setProperty("--fg-clr", "#000000"); 
        root.setProperty("--trans", "#1112");
    } else if (user.theme == "dark") {
        root.setProperty("--bg-clr", "#000000"); 
        root.setProperty("--mbg-clr", "#111111"); 
        root.setProperty("--mg-clr", "#888888");
        root.setProperty("--mfg-clr", "#eeeeee"); 
        root.setProperty("--fg-clr", "#ffffff");
        root.setProperty("--trans", "#8884");
        document.querySelector('#settings-button').style.filter = "invert(100%)";
        document.querySelector('.cross').style.filter = "invert(100%)";
    };
    constructHome();
};

function constructHome() {
    const container = document.querySelector('main#container');
    container.className = "home";
    container.innerHTML = `
    <section class="Nyheter" id="news"></section>
    <section class="Viktigt" id="important"></section>
    <section class="Meddelanden" id="messages"></section>
    `;
    const sections = container.querySelectorAll('section');
    sections.forEach((section) => {
        section.innerHTML = `<h1>${section.className}</h1>`;
        section.innerHTML += '<div id="content"></div>';
    });
};

function constructProfile() {
    container.className = "profile";
    container.innerHTML = `
    <div id="user-info">
        <p>Användarnamn: ${user.name}</p>
        <p>Epost: ${user.email}</p>
        <p>Titel: ${user.title}</p>
    </div>
    `;
}