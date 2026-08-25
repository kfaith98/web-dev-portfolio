const blogContainer = document.getElementById('blog-posts');

function createPost(post) {
  const article = document.createElement('article');
  article.className = 'blog-post';

  article.innerHTML = `
    <h3 class='post-title'>${post.title}</h3>
    <p class='post-date'>${post.date}</p>
    <div class='post-content'>
      <p>${post.content}</p>
    </div>
  `;

  return article;
}

// Sort newest posts automatically
function renderPosts(posts) {
  if (!blogContainer) return;

  blogContainer.innerHTML = '';

  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedPosts.forEach(post => {
    blogContainer.appendChild(createPost(post));
  });
}

renderPosts(posts);

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

// Back to Top button animation
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});