
function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        alert("Şifrələr uyğun gəlmir!");
        return;
    }
    if (localStorage.getItem("user_" + username)) {
        alert("Bu istifadəçi adı artıq mövcuddur.");
        return;
    }
    localStorage.setItem("user_" + username, password);
    alert("Qeydiyyat tamamlandı. İndi daxil ola bilərsiniz.");
    window.location.href = "login.html";
}
