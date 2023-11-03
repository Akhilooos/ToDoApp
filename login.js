const email = document.getElementById("typeEmailX");
const password = document.getElementById("typePasswordX");

function Validate() {
    if (email.value === 'admin' && password.value === '12345') {
        window.location.href = "homepage.html";
    } else {
        alert("Invalid email or password. Please try again.");
        event.preventDefault();
    }
}