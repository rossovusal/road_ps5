
function loadPipeForm() {
    const user = localStorage.getItem("loggedInUser");
    const max = Math.min(parseInt(JSON.parse(localStorage.getItem("overallScores") || "{}")[user] || 0), 100);
    if (localStorage.getItem("pipeLocked") === "true" || localStorage.getItem("pipe_" + user)) {
        document.getElementById("pipeFormArea").innerHTML = "<p style='color:red;'>Proqnoz vermə mərhələsi bağlanıb və ya siz artıq proqnoz vermisiniz.</p>";
        if (localStorage.getItem("pipeLocked") === "true") loadPipeTable();
        return;
    }

    let html = `
        <input id="pipeTeam" placeholder="Proqnozunu daxil et"><br>
        <select id="pipeGedis">
            ${Array.from({length: 100}, (_, i) => i+1).map(i => `<option value="${i}" ${i > max ? "disabled" : ""}>${i}</option>`).join("")}
        </select><br>
        <input type="password" id="pipePass" placeholder="Şifrə">
        <button onclick="submitPipe()">PİPEPROQNOZU GÖNDƏR</button>
    `;
    document.getElementById("pipeFormArea").innerHTML = html;
}

function submitPipe() {
    const user = localStorage.getItem("loggedInUser");
    const pass = document.getElementById("pipePass").value;
    if (pass !== localStorage.getItem("user_" + user)) {
        alert("Şifrə yalnışdır.");
        return;
    }
    const team = document.getElementById("pipeTeam").value;
    const gedis = document.getElementById("pipeGedis").value;
    if (!team) {
        alert("Proqnoz boş ola bilməz.");
        return;
    }
    localStorage.setItem("pipe_" + user, JSON.stringify({team, gedis}));
    document.getElementById("pipeFormArea").innerHTML = "<p style='color:lime;'>Proqnoz uğurla göndərildi!</p>";
}

function finalizePipe() {
    const code = document.getElementById("pipeLockCode").value;
    if (code !== "Baku2025!") {
        alert("Təhlükəsizlik kodu yalnışdır.");
        return;
    }
    localStorage.setItem("pipeLocked", "true");
    loadPipeTable();
    document.querySelector("button[onclick='calculatePipe()']").disabled = false;
}

function loadPipeTable() {
    const tableDiv = document.getElementById("pipeTableArea");
    const users = [];
    for (let key in localStorage) {
        if (key.startsWith("user_")) users.push(key.replace("user_", ""));
    }
    let html = "<table border='1'><tr><th>#</th><th>İştirakçı</th><th>Proqnoz</th><th>Gediş</th><th>Nəticə</th></tr>";
    users.forEach((u, i) => {
        const pipe = JSON.parse(localStorage.getItem("pipe_" + u) || "null");
        if (pipe) {
            html += `<tr><td>${i+1}</td><td>${u}</td><td>${pipe.team}</td><td>${pipe.gedis}</td>
            <td><select id="pipeResult_${u}">
                <option value="">--</option><option value="true">DOĞRU</option><option value="false">YANLIŞ</option>
            </select></td></tr>`;
        }
    });
    html += "</table>";
    tableDiv.innerHTML = html;
}

function calculatePipe() {
    const code = document.getElementById("pipeCalcCode").value;
    if (code !== "Baku2025!") {
        alert("Təhlükəsizlik kodu yalnışdır.");
        return;
    }

    let overall = JSON.parse(localStorage.getItem("overallScores") || "{}");
    for (let key in localStorage) {
        if (key.startsWith("pipe_")) {
            let u = key.replace("pipe_", "");
            let res = document.getElementById("pipeResult_" + u);
            if (res) {
                const verdict = res.value;
                const gedis = parseInt(JSON.parse(localStorage.getItem(key)).gedis);
                if (verdict === "true") overall[u] = (overall[u] || 0) + gedis;
                else if (verdict === "false") overall[u] = (overall[u] || 0) - gedis;
            }
        }
    }
    localStorage.setItem("overallScores", JSON.stringify(overall));
    alert("Pipeproqnozlar hesablandı.");
}
