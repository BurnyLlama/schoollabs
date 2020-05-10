// Fetch all JSON files!
let settings;
let user;
(async () => {
    const settings_request = await fetch(`../scripts/settings.json`);
    settings = await settings_request.json();
    console.log('Fetched settings.json!');

    // Set the accent color
    document.documentElement.style.setProperty("--primary", settings.prim_color)

    const user_req = await fetch('/api/fetch/user');
    user = await user_req.json()
    console.log(user)
    if (user.err) return document.querySelector('#container').innerHTML = '<p style="font-size: 3em; margin: 1em">Vänligen logga in! (Om du nyss var inloggad så har din API-token gått ut.)</p>'

    // Run the constructor, to construct the page!
    construct();
})();