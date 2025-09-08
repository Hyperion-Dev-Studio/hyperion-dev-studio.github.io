// Modal
const betaBtn = document.getElementById("betaBtn");
const betaModal = document.getElementById("betaModal");
const closeModal = document.getElementById("closeModal");
if (betaBtn) betaBtn.addEventListener("click", () => betaModal.classList.remove("hidden"));
if (closeModal) closeModal.addEventListener("click", () => betaModal.classList.add("hidden"));

// Contact form
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;
  window.location.href = `mailto:hyperion.dev.studio@gmail.com?subject=Project Inquiry&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
});

// Blog rendering (simple client-side hash router)
const blogRoot = document.getElementById("blogRoot");
const posts = [
  {
    slug: "prepare-cscp",
    title: "How to Prepare for CSCP Certification",
    date: "2025-03-05",
    summary: "Tips and strategies to pass CSCP and how LogiQuiz helps.",
    content: `<p>The APICS CSCP certification validates end-to-end supply chain knowledge. LogiQuiz offers realistic practice quizzes with instant feedback and explanations, so you study smarter.</p>`
  }
];

function renderBlogIndex() {
  blogRoot.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="h1">Hyperion Blog</h1>
        <div class="blog-list">
          ${posts.map(p => `
            <a href="#/blog/${p.slug}" class="blog-card">
              <h3 class="blog-title">${p.title}</h3>
              <div class="blog-meta">${p.date}</div>
              <p>${p.summary}</p>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
function renderBlogPost(slug){
  const p = posts.find(x => x.slug===slug);
  if(!p){ blogRoot.innerHTML="<p>Post not found.</p>"; return; }
  blogRoot.innerHTML = `
    <section class="section">
      <div class="container">
        <a href="#blog" class="btn btn-secondary">← Back</a>
        <h1 class="h2">${p.title}</h1>
        <div class="blog-meta">${p.date}</div>
        <article class="blog-content">${p.content}</article>
      </div>
    </section>
  `;
}

function router(){
  const hash = window.location.hash;
  if(hash.startsWith("#/blog/")){
    renderBlogPost(hash.replace("#/blog/",""));
  }else if(hash==="#blog" || hash==="#/blog"){
    renderBlogIndex();
  }else{
    blogRoot.innerHTML="";
  }
}
window.addEventListener("hashchange", router);
router();
