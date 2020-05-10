// Fetch all JSON files!
let settings;
(async () => {
    const settings_request = await fetch(`scripts/settings.json`);
    settings = await settings_request.json();
    console.log('Fetched settings.json!');

    // Run the main function (when done).
    main ()
})();

function main () {

// Log the settings, why not?
console.log(settings);

// This will set the background as either an image or hex-color.
if (settings.bg_scheme.includes("#")) {
    document.querySelector("body").style.background = settings.bg_scheme;
} else {
    document.querySelector("body").style.background = "url(images/" + settings.bg_scheme + ")";
};

// Set the accent color
document.documentElement.style.setProperty("--primary", settings.prim_color)

// Set the school name in the header.
document.querySelector("#school").innerHTML = settings.school_name;

}

// TEST
(async () => {
    const con = await fetch('/api');
    const API = await con.json();
    console.log(API.msg);
})();