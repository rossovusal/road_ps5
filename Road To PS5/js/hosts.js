
function loadSchedule() {
    if (!localStorage.getItem("drawList")) {
        alert("Əvvəlcə püşk atılmalıdır!");
        window.location.href = "players.html";
        return;
    }

    const drawList = JSON.parse(localStorage.getItem("drawList"));
    const form = document.getElementById("scheduleForm");

    drawList.forEach((name, i) => {
        const div = document.createElement("div");
        div.innerHTML = `<b>${i + 1}. ${name}</b> - <input type="date" id="date_${i}"><br>`;
        form.appendChild(div);
    });

    if (localStorage.getItem("scheduleConfirmed")) {
        document.querySelectorAll("input[type='date']").forEach(input => input.disabled = true);
        document.getElementById("confirmScheduleBtn").disabled = true;
        document.getElementById("scheduleMessage").textContent = "Cədvəl artıq təsdiqlənib!";
    }
}

function confirmSchedule() {
    const code = document.getElementById("scheduleCode").value;
    if (code !== "Baku2025!") {
        alert("Təhlükəsizlik kodu yalnışdır.");
        return;
    }

    let drawList = JSON.parse(localStorage.getItem("drawList"));
    let schedule = [];

    for (let i = 0; i < drawList.length; i++) {
        let date = document.getElementById("date_" + i).value;
        if (!date) {
            alert("Bütün tarixlər seçilməlidir.");
            return;
        }
        schedule.push({ name: drawList[i], date: date });
    }

    localStorage.setItem("schedule", JSON.stringify(schedule));
    localStorage.setItem("scheduleConfirmed", "true");
    document.getElementById("scheduleMessage").textContent = "Cədvəl təsdiqləndi!";
    document.getElementById("confirmScheduleBtn").disabled = true;
}
