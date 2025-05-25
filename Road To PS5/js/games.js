
function initGameInputs() {
    const now = new Date();
    const start = new Date();
    const end = new Date();
    start.setHours(13, 0, 0, 0); // Monday 13:00
    end.setHours(13, 0, 0, 0); // Friday 13:00

    let day = now.getDay();
    start.setDate(now.getDate() - day + 1);
    end.setDate(now.getDate() + (5 - day));

    if (now < start || now > end) {
        document.getElementById("gamesContainer").innerHTML = "<p style='color:red;'>Oyunları yalnız Bazar ertəsi 13:00-dan Cümə 13:00-dək daxil etmək mümkündür.</p>";
        document.getElementById("submitGamesBtn").disabled = true;
        return;
    }

    const container = document.getElementById("gamesContainer");
    for (let i = 0; i < 10; i++) {
        container.innerHTML += `
            <input placeholder="Komanda 1" id="team1_${i}"> vs 
            <input placeholder="Komanda 2" id="team2_${i}"><br>`;
    }

    container.innerHTML += `
        <input placeholder="Komanda 1" id="team1_10" disabled style="background:gray"> vs 
        <input placeholder="Komanda 2" id="team2_10" disabled style="background:gray"><br>`;
}

function submitGames() {
    const pass = document.getElementById("gamePass").value;
    const user = localStorage.getItem("loggedInUser");
    if (pass !== localStorage.getItem("user_" + user)) {
        alert("Şifrə yalnışdır.");
        return;
    }

    let games = [];
    for (let i = 0; i < 10; i++) {
        let t1 = document.getElementById("team1_" + i).value;
        let t2 = document.getElementById("team2_" + i).value;
        if (!t1 || !t2) {
            alert("Bütün oyunlar doldurulmalıdır.");
            return;
        }
        games.push({ team1: t1, team2: t2 });
    }

    localStorage.setItem("weeklyGames", JSON.stringify(games));
    localStorage.setItem("gameConfirmed", "true");

    const deadline = new Date().getTime() + 48 * 3600 * 1000;
    localStorage.setItem("gameDeadline", deadline);

    document.getElementById("gameMessage").textContent = "Oyunlar təsdiqləndi!";
    document.getElementById("submitGamesBtn").disabled = true;
}
