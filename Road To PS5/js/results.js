
function loadResultInputs() {
    const form = document.getElementById("resultForm");
    const games = JSON.parse(localStorage.getItem("weeklyGames") || "[]");

    if (!games.length) {
        form.innerHTML = "<p style='color:red;'>Oyunlar tapılmadı!</p>";
        return;
    }

    games.forEach((g, i) => {
        form.innerHTML += `<b>${g.team1} vs ${g.team2}</b> 
            <select id="res_${i}">
                <option value="">--</option>
                <option value="1">1</option>
                <option value="X">X</option>
                <option value="2">2</option>
            </select><br>`;
    });
}

function calculateResults() {
    const code = document.getElementById("resultCode").value;
    if (code !== "Baku2025!") {
        alert("Təhlükəsizlik kodu yalnışdır.");
        return;
    }

    const games = JSON.parse(localStorage.getItem("weeklyGames") || "[]");
    let results = [];

    for (let i = 0; i < games.length; i++) {
        let val = document.getElementById("res_" + i).value;
        results.push(val || "0");
    }

    localStorage.setItem("gameResults", JSON.stringify(results));
    document.getElementById("resultMessage").textContent = "Nəticələr qeyd olundu!";
}
