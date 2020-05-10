// Global variables
const container = document.querySelector('main#container');

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
    return constructHome();
};

function constructHome() {
    container.className = "home";
    container.innerHTML = `
    <section class="Snabbgenvägar" id="quick-space"></section>
    <section class="Nyheter och Information" id="news"></section>
    <section class="Meddelanden" id="messages"></section>
    `;

    const sections = container.querySelectorAll('section');
    sections.forEach((section) => {
        section.innerHTML = `<h1>${section.className}</h1>`;
        section.innerHTML += '<div id="content"></div>';
    });

    const quickSpaceContainer = container.querySelector('#quick-space > #content');
    quickSpaceContainer.innerHTML = `
    <h2>Ändra Lösenord</h2>
        <form method="POST" action="/api/admin/changePass">
        <input type="text" id="user" name="user" placeholder="Användarnamn">
        <input type="password" id="pass" name="pass" placeholder="Lösenord">
        <input type="submit" value="Byt Lösenord">
    </form>
    <h2>Skapa Användare</h2>
    <form method="POST" action="/api/auth/register">
        <input type="text" id="name" name="name" placeholder="Användarnamn">
        <input type="password" id="pass" name="pass" placeholder="Lösenord">
        <input type="text" id="title" name="title" placeholder="Titel">
        <p>Titeln kan vara en av följande: student, guardian, teacher, admin</p>
        <input type="text" id="email" name="email" placeholder="epost@domän.se">
        <input type="submit" value="Skapa användare!">
    </form>
    `;

    const newsContainer = container.querySelector('#news > #content');
    newsContainer.innerHTML = `
    <h2>Skicka ut en Nyhet/Information!</h2>
    <form method="POST" action="/api/news/create">
        <input type="text" id="title" name="title" placeholder="Rubrik">
        <textarea name="content" placeholder="Skriv nyheten/informationen här."></textarea>
        <input type="submit" value="Skicka ut!">
    </form>
    `;

    const messagesContainer = container.querySelector('#quick-space > #content');
    
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