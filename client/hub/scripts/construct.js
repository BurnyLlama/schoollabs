let menuEntries
function construct() {
    const avatar = document.querySelector('#avatar-letter');
    avatar.innerHTML = user.name.charAt(0);

    const root = document.documentElement.style;
    if (user.theme == "light") {
        root.setProperty("--bg-clr", "#ffffff") 
        root.setProperty("--mbg-clr", "#eeeeee") 
        root.setProperty("--mg-clr", "#888888")
        root.setProperty("--mfg-clr", "#111111") 
        root.setProperty("--fg-clr", "#000000") 
    } else if (user.theme == "dark") {
        root.setProperty("--bg-clr", "#000000") 
        root.setProperty("--mbg-clr", "#111111") 
        root.setProperty("--mg-clr", "#888888")
        root.setProperty("--mfg-clr", "#eeeeee") 
        root.setProperty("--fg-clr", "#ffffff") 
        document.querySelector('#settings-button').style.filter = "invert(100%)"
    }
};