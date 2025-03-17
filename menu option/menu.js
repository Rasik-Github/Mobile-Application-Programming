document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const navList = document.querySelector(".nav_list");
    const toggleBtn = document.querySelector(".toggle-btn");
    const body = document.body;

    burger.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

    toggleBtn.addEventListener("click", function () {
        body.classList.toggle("active");
    });
});
