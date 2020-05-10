// Fetch all JSON files!
let settings;
let user;
(async () => {
    const settings_request = await fetch(`/settings.json`);
    settings = await settings_request.json();
    console.log('Fetched settings.json!', settings);

    const avatarBg = document.querySelector('#avatar-bg').style;
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const avatarBgColor = `rgb(${red}, ${green}, ${blue})`;
    avatarBg.background = avatarBgColor;
    
    // Set the accent color
    document.documentElement.style.setProperty("--primary", settings.prim_color)
})();