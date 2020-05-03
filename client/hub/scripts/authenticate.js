// Checking if someone is logged in or simply went to /hub
(async () => {
    let con = await fetch('/auth_hub');
    const status = await con.json();
    console.log(status.msg);

    document.body.innerHTML += status.msg;
})();