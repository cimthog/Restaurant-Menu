const navIcon = document.querySelector(".link-toggle")

function toggleLinks() {
    console.log("clicking")
    navLinks = document.querySelector('.top-links')
    navLinks.classList.toggle("show");
}

navIcon.addEventListener("click", toggleLinks)

console.log("The making.")