document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("clickMe");
    const message = document.getElementById("message");
    const restoreClickMe = document.getElementById("restoreClickMe");
    const form = document.getElementById("nameForm");
    const input = document.getElementById("username");
    const greeting = document.getElementById("greetingMessage");
    const resetBtn = document.getElementById("resetBtn");
    const themeToggle = document.getElementById("themeToggle");
    const lastVisit = document.getElementById("lastVisit");

    // Default user settings
    let userSettings = {
        username: "",
        theme: "light",
        fontSize: "16px",
        lastVisit: new Date().toLocaleString(),
    };

    // Load saved settings from local storage
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
        userSettings = JSON.parse(savedSettings);
        applySettings();
    }

    // Apply settings (theme, font size, username, last visit)
    function applySettings() {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(userSettings.theme);
        document.body.style.fontSize = userSettings.fontSize;
        if (userSettings.username) {
            greeting.textContent = `Hello, ${userSettings.username}! Welcome back!`;
            greeting.style.color = "green";
        }
        lastVisit.textContent = `Last visit: ${userSettings.lastVisit}`;
    }

    // Theme toggle switch
    themeToggle.addEventListener("change", function () {
        userSettings.theme = themeToggle.checked ? "dark" : "light";
        saveSettings();
        applySettings();
    });

    // Ensure toggle reflects the correct theme
    themeToggle.checked = userSettings.theme === "dark";

    // Handle form submission (saving username)
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = input.value.trim();

        if (name === "") {
            greeting.textContent = "Please enter a valid name!";
            greeting.style.color = "red";
        } else {
            userSettings.username = name;
            userSettings.lastVisit = new Date().toLocaleString();
            saveSettings();
            applySettings();
            input.value = ""; // Clear input field
        }
    });

    // Clear stored settings when Reset button is clicked
    resetBtn.addEventListener("click", function () {
        localStorage.removeItem("userSettings");
        userSettings = { ...userSettings, username: "", lastVisit: new Date().toLocaleString() };
        greeting.textContent = "";
        applySettings();
    });

    // Save settings to Local Storage
    function saveSettings() {
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
    }

    // Button click functionality
    button.addEventListener("click", function () {
        message.textContent = "Hello! You clicked the button!";
        message.style.color = "red";
        button.style.display = "none";
        restoreClickMe.style.display = "inline-block";
    });

    restoreClickMe.addEventListener("click", function () {
        button.style.display = "inline-block";
        message.textContent = "";
        restoreClickMe.style.display = "none";
    });
    localStorage.removeItem("userSettings");
    userSettings = { ...userSettings, username: "", lastVisit: new Date().toLocaleString() };
    greeting.textContent = "";
    applySettings();
});
