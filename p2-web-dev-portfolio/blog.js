// blog.js

const posts = [
  {
    title: "My First Blog Post",
    date: "April 1, 2026",
    content: `
      <p>Hello! This is my first blog post. I can write my story, share a project update, or jot down my thoughts here.</p>
    `
  }
  // Add more posts here
];

// Select the container
const blogContainer = document.getElementById("blog-posts");

// Render each post
posts.forEach(post => {
  const article = document.createElement("article");
  article.className = "blog-post";

  article.innerHTML = `
    <h3 class="post-title">${post.title}</h3>
    <p class="post-date">${post.date}</p>
    <div class="post-content">${post.content}</div>
  `;

  blogContainer.appendChild(article);
});