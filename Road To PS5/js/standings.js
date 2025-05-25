
function calculateStandings() {
    const gameResults = JSON.parse(localStorage.getItem("gameResults") || "[]");
    const games = JSON.parse(localStorage.getItem("weeklyGames") || "[]");
    const users = [];

    for (let key in localStorage) {
        if (key.startsWith("user_")) users.push(key.replace("user_", ""));
    }

    let scores = [];
    let scoreMap = {};

    // Əmsallar üçün hər nəticə üçün neçə nəfər eyni variantı yazıb
    let emsallar = Array(games.length).fill(0);
    users.forEach(user => {
        let preds = JSON.parse(localStorage.getItem("predictions_" + user) || "[]");
        preds.forEach((pred, i) => {
            if (pred === gameResults[i]) emsallar[i]++;
        });
    });

    users.forEach(user => {
        let preds = JSON.parse(localStorage.getItem("predictions_" + user) || "[]");
        let correct = 0;
        let userEmsal = [];
        preds.forEach((pred, i) => {
            if (pred === gameResults[i]) {
                correct++;
                userEmsal.push(emsallar[i]);
            }
        });
        let sum = correct >= 3 ? correct : 0;
        scores.push({ user, correct, emsallar: userEmsal, sum });
        scoreMap[user] = sum;
    });

    // Sort by score and then by lowest emsal sum
    scores.sort((a, b) => {
        if (b.sum !== a.sum) return b.sum - a.sum;
        let aMin = Math.min(...a.emsallar);
        let bMin = Math.min(...b.emsallar);
        return aMin - bMin;
    });

    // Yekun xal paylama
    let ranks = [9,8,7,6,5,4,3,2,1,0];
    let table = "<table border='1' style='margin:auto;background:white;color:black'><tr><th>Yer</th><th>İştirakçı</th><th>Tapılan</th><th>Əmsallar</th><th>Yekun Xal</th></tr>";
    let overall = JSON.parse(localStorage.getItem("overallScores") || "{}");

    scores.forEach((s, i) => {
        let rankPoint = s.correct >= 3 ? (ranks[i] || 0) : 0;
        let emsalBadges = s.emsallar.map(e => `<span style='border:1px solid #000;padding:2px;margin:2px;display:inline-block'>${e}</span>`).join(" ");
        table += `<tr><td>${i+1}</td><td>${s.user}</td><td>${s.correct}</td><td>${emsalBadges}</td><td>${rankPoint}</td></tr>`;
        overall[s.user] = (overall[s.user] || 0) + rankPoint;
    });

    table += "</table>";
    document.getElementById("currentStandings").innerHTML = table;

    // Ümumi turnir cədvəli
    let ohtml = "<table border='1' style='margin:auto;background:white;color:black'><tr><th>#</th><th>İştirakçı</th><th>Cəmi Xal</th></tr>";
    let olist = [];
    for (let k in overall) olist.push({ user: k, sum: overall[k] });
    olist.sort((a, b) => b.sum - a.sum);
    olist.forEach((s, i) => {
        ohtml += `<tr><td>${i+1}</td><td>${s.user}</td><td>${s.sum}</td></tr>`;
    });
    ohtml += "</table>";

    document.getElementById("overallStandings").innerHTML = ohtml;
    localStorage.setItem("overallScores", JSON.stringify(overall));
}
