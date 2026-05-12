const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('#nav-links a');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  // Smooth scroll highlight
  let current = '';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    // Section is in viewport
    if (rect.top <= 150 && rect.bottom >= 150) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to Top button animation
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

const title = document.querySelector('.about-name-and-title h2');
const text = 'Web developer in training';
let typingIndex = 0;
let forward = true; // true if typing forward (progressing), false if deleting
let typingTimeout = null; // Stores the timeout ID for the typing animation

function typeLoop() {
  if (!title) return; // Prevent errors if title is not found

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  if (forward) {
    typingIndex++;
    if (typingIndex > text.length) {
      typingIndex = text.length;
      forward = false;
      typingTimeout = setTimeout(typeLoop, 1500); // pause at full text
      title.textContent = text.slice(0, typingIndex);
      return;
    }
  } else {
    typingIndex--;
    if (typingIndex <= 0) {
      typingIndex = 0; // Clamp index to 0 to prevent negative values
      forward = true;
      typingTimeout = setTimeout(typeLoop, 500); // pause at empty
      title.textContent = text.slice(0, typingIndex);
      return;
    }
  }

  title.textContent = text.slice(0, typingIndex);
  typingTimeout = setTimeout(typeLoop, 150); // adjust typing speed here
}
typeLoop();

// Blog preview in home page
const previewContainer = document.getElementById('blog-preview-container');

function createPreview(post) {
  const article = document.createElement('article');
  article.className = 'blog-post';

  article.innerHTML = `
    <h3 class='post-title'>${post.title}</h3>
    <p class='post-date'>${post.date}</p>
    <p>${post.preview}</p>
    <a href='./blog.html' class='primary-btn'>Read More</a>
  `;

  return article;
}

function renderPreview(posts) {
  if (!previewContainer) return;

  const latestPosts = [...posts].reverse().slice(0, 2);

  latestPosts.forEach((post) => {
    previewContainer.appendChild(createPreview(post));
  });
}

renderPreview(posts);

// Burger menu on mobile
function setupBurgerMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const navLinksList = document.getElementById('nav-links');

  if (!burgerBtn || !navLinksList) return;

  burgerBtn.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('open');
    burgerBtn.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinksList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinksList.classList.remove('open');
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', false);
    }
  });
}

setupBurgerMenu();