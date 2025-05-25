
function loadRoundGames() {
    const deadline = parseInt(localStorage.getItem("gameDeadline"));
    const now = new Date().getTime();
    const timer = document.getElementById("timer");

    function updateTimer() {
        const left = deadline - new Date().getTime();
        if (left <= 0) {
            timer.textContent = "00:00:00";
            document.getElementById("submitPredictionsBtn").disabled = true;
            document.querySelectorAll("select").forEach(s => s.disabled = true);
            clearInterval(interval);
            return;
        }
        let hours = Math.floor(left / (1000 * 60 * 60));
        let mins = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((left % (1000 * 60)) / 1000);
        timer.textContent = String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    const form = document.getElementById("predictionForm");
    const games = JSON.parse(localStorage.getItem("weeklyGames") || "[]");
    const user = localStorage.getItem("loggedInUser");

    if (!games.length) {
        form.innerHTML = "<p style='color:red;'>Oyunlar daxil edilməyib!</p>";
        document.getElementById("submitPredictionsBtn").disabled = true;
        return;
    }

    if (localStorage.getItem("predictions_" + user)) {
        form.innerHTML = "<p style='color:lime;'>Siz artıq bu turun proqnozlarını daxil etmisiniz.</p>";
        document.getElementById("submitPredictionsBtn").disabled = true;
        return;
    }

    games.forEach((g, i) => {
        form.innerHTML += `<b>${g.team1} vs ${g.team2}</b> 
            <select id="pred_${i}">
                <option value="1">1</option>
                <option value="X">X</option>
                <option value="2">2</option>
            </select><br>`;
    });
}

function submitPredictions() {
    const pass = document.getElementById("roundPass").value;
    const user = localStorage.getItem("loggedInUser");
    if (pass !== localStorage.getItem("user_" + user)) {
        alert("Şifrə yalnışdır.");
        return;
    }

    const games = JSON.parse(localStorage.getItem("weeklyGames") || "[]");
    let picks = [];
    for (let i = 0; i < games.length; i++) {
        picks.push(document.getElementById("pred_" + i).value);
    }

    localStorage.setItem("predictions_" + user, JSON.stringify(picks));
    document.getElementById("roundMessage").textContent = "Proqnozlar qəbul edildi!";
    document.getElementById("submitPredictionsBtn").disabled = true;
}
