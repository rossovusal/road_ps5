
function loadPlayers() {
    const table = document.querySelector("#playerTable tbody");
    table.innerHTML = "";
    let i = 1;
    for (let key in localStorage) {
        if (key.startsWith("user_")) {
            let username = key.replace("user_", "");
            table.innerHTML += `<tr><td>${i++}</td><td>${username}</td></tr>`;
        }
    }
}

function drawLots() {
    const code = document.getElementById("puskPassword").value;
    if (code !== "Baku2025!") {
        alert("Təhlükəsizlik kodu yalnışdır.");
        return;
    }

    if (localStorage.getItem("drawDone")) {
        alert("Püşk artıq atılıb.");
        return;
    }

    let players = [];
    for (let key in localStorage) {
        if (key.startsWith("user_")) {
            players.push(key.replace("user_", ""));
        }
    }

    if (players.length === 0) {
        alert("Heç bir iştirakçı yoxdur.");
        return;
    }

    let fullCycle = [];
    for (let i = 0; i < 4; i++) {
        fullCycle = fullCycle.concat(players);
    }

    localStorage.setItem("drawList", JSON.stringify(fullCycle));
    localStorage.setItem("drawDone", "true");

    document.getElementById("drawMessage").textContent = "Püşk uğurla atıldı!";
    document.getElementById("drawButton").disabled = true;
}
