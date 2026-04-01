// Smooth scroll highlight

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Back to Top button animation
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Typing effect on header text
const title = document.querySelector(".about-name-and-title h2");
const text = "Full-Stack Web Developer";
let index = 0;
let forward = true; // direction of typing
let typingTimeout = null; // Track the timeout

function typeLoop() {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  if (forward) {
    index++;
    if (index > text.length) {
      index = text.length;
      forward = false;
      typingTimeout = setTimeout(typeLoop, 1500); // pause at full text
      title.textContent = text.slice(0, index);
      return;
    }
  } else {
    index--;
    if (index <= 0) {
      index = 0; // Clamp index to 0 to prevent negative values
      forward = true;
      typingTimeout = setTimeout(typeLoop, 500); // pause at empty
      title.textContent = text.slice(0, index);
      return;
    }
  }

  title.textContent = text.slice(0, index);
  typingTimeout = setTimeout(typeLoop, 150); // adjust typing speed here
}

typeLoop();