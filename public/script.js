const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-list");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });

  //   Animate Links
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 2.5}s`;
    console.log(link);
  });
};

navSlide();
