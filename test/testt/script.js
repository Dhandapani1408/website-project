document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }

    // Apply saved theme on load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", toggleTheme);
});
