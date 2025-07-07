document.addEventListener("DOMContentLoaded", function () {
    let storedName = localStorage.getItem("userName");
    let storedPic = localStorage.getItem("profilePic");
    let storedTheme = localStorage.getItem("theme");

    if (storedName) {
        document.getElementById("user-name").innerText = storedName;
    }

    if (storedPic) {
        document.getElementById("profile-pic").src = storedPic;
    }

    if (storedTheme) {
        document.body.classList.add(storedTheme);
        document.getElementById("theme-toggle").innerText = storedTheme === "dark-mode" ? "☀️" : "🌙";
    }
});

// Change Profile Picture & Save to Local Storage
document.getElementById("upload-pic").addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let imgSrc = e.target.result;
            document.getElementById("profile-pic").src = imgSrc;
            localStorage.setItem("profilePic", imgSrc);
        };
        reader.readAsDataURL(file);
    }
});

// Edit Name
document.getElementById("edit-name").addEventListener("click", function () {
    let newName = prompt("Enter your name:");
    if (newName) {
        document.getElementById("user-name").innerText = newName;
        localStorage.setItem("userName", newName);
    }
});

// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode");
        this.innerText = "🌙";
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
        this.innerText = "☀️";
    }
});
