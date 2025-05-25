
function loadPredictions() {
    const table = document.getElementById("predictionsTable");
    const deadline = parseInt(localStorage.getItem("gameDeadline"));
    const now = new Date().getTime();

    if (now < deadline) {
        table.innerHTML = "<p style='color:red;'>Proqnozlar taymer bitdikdən sonra görünəcək.</p>";
        return;
    }

    const games = JSON.parse(localStorage.getItem("weeklyGames") || "[]");
    const users = [];

    for (let key in localStorage) {
        if (key.startsWith("user_")) {
            users.push(key.replace("user_", ""));
        }
    }

    let html = "<table border='1' style='margin:auto; background:white; color:black'><tr><th>Oyun</th>";
    users.forEach(user => html += `<th>${user}</th>`);
    html += "</tr>";

    games.forEach((g, i) => {
        html += `<tr><td>${g.team1} vs ${g.team2}</td>`;
        users.forEach(user => {
            let preds = JSON.parse(localStorage.getItem("predictions_" + user) || "[]");
            html += `<td>${preds[i] || "-"}</td>`;
        });
        html += "</tr>";
    });

    html += "</table>";
    table.innerHTML = html;
}
