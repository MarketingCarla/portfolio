const navIcon = document.getElementById("navIcon");
const closeNavIcon = document.getElementById("closeNavIcon");
const navMenu = document.getElementById("navMenu");

navIcon.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

closeNavIcon.addEventListener("click", () => {
  navMenu.classList.remove("active");
});

document.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !navIcon.contains(event.target)) {
    navMenu.classList.remove("active");
  }
});
