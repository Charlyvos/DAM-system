let menu = document.getElementById("menu");
let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let bar3 = document.getElementById("bar3");
let sidebar = document.getElementsByClassName("sidebar")[0];

menu.addEventListener("click", () => {
  bar1.style.transform = "rotate(-45deg) translate(-6px, 0px)";
  bar2.style.opacity = "0";
  bar3.style.transform = "rotate(45deg) translate(-22px, -18px)";
});

// When the windows scroll, execute the sticky function
window.onscroll = () => { setSticky() };

// When the offset reaches 260px, make the sidebar fixed with the sticky class
const setSticky = () => {
  if (window.pageYOffset > "260") {
    sidebar.classList.add("sticky");
  } else {
    sidebar.classList.remove("sticky");
  }
}