
function checkLogin() {
    const username = localStorage.getItem("loggedInUser");
    const panel = document.getElementById("userPanel");
    if (username) {
        panel.innerHTML = 'Salam, ' + username + ' | <a href="#" onclick="logout()">Çıxış</a>';
    } else {
        alert("Zəhmət olmasa sistemə daxil olun.");
        window.location.href = "login.html";
    }
}
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
