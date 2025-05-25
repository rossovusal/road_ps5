
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedPassword = localStorage.getItem("user_" + username);
    if (storedPassword === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("İstifadəçi adı və ya şifrə yalnışdır.");
    }
}
