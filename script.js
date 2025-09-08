// ===== Modal (Join the Beta)
const betaBtn = document.getElementById("betaBtn");
const betaModal = document.getElementById("betaModal");
const closeModal = document.getElementById("closeModal");
betaBtn?.addEventListener("click", () => {
  betaModal.classList.remove("hidden");
  betaModal.setAttribute("aria-hidden", "false");
});
closeModal?.addEventListener("click", () => {
  betaModal.classList.add("hidden");
  betaModal.setAttribute("aria-hidden", "true");
});
betaModal?.addEventListener("click", (e) => {
  if (e.target === betaModal) {
    betaModal.classList.add("hidden");
    betaModal.setAttribute("aria-hidden", "true");
  }
});

// ===== Contact form -> mailto
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const name = encodeURIComponent(f.name.value);
  const email = encodeURIComponent(f.email.value);
  const message = encodeURIComponent(f.message.value);
  window.location.href = `mailto:hyperion.dev.studio@gmail.com?subject=Project%20Inquiry&body=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;
});

// ===== Blog data with tags
const posts = [
  {
    slug: "introducing-logiquiz",
    title: "Introducing LogiQuiz: Exam-Style Prep for APICS CPIM & CSCP",
    date: "2025-01-15",
    summary:
      "Why we built LogiQuiz and how it helps supply chain professionals prepare efficiently with thematic exercises, instant feedback, and offline support.",
    tags: ["LogiQuiz", "CSCP", "CPIM", "Product"],
    content: `
      <p>We created <strong>LogiQuiz</strong> to make certification prep feel focused and modern.
      The app offers thematic practice for CPIM Parts 1 & 2 and CSCP Modules 1–3, detailed explanations,
      and an experience that works great offline.</p>
      <p><a href="#apps" class="btn btn-lg">📲 Try LogiQuiz</a></p>
    `,
  },
  {
    slug: "prepare-apics-cscp",
    title: "How to Prepare for the APICS CSCP Certification",
    date: "2025-03-05",
    summary:
      "A practical guide to mastering APICS CSCP certification — and how LogiQuiz can accelerate your preparation.",
    tags: ["CSCP", "Certification", "Study", "LogiQuiz"],
    content: `
      <p>The <strong>APICS CSCP</strong> certification validates end-to-end supply chain knowledge.</p>
      <h3>What the CSCP Exam Covers</h3>
      <ul>
        <li>Module 1: Supply Chain Design</li>
        <li>Module 2: Supply Chain Planning & Execution</li>
        <li>Module 3: Supply Chain Improvements & Best Practices</li>
      </ul>
      <p>Use official materials + <em>LogiQuiz</em> daily practice to lock knowledge and timing.</p>
      <p><a href="#apps" class="btn btn-lg">📲 Study with LogiQuiz</a></p>
    `,
  },
  // … add more posts here as you like …
];

// ===== Simple hash router with blog index, post, and tag filtering
const blogRoot = document.getElementById("blogRoot");

// helpers
const uniqueTags = () =>
  [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

function BlogIndexView(selectedTags = []) {
  const allTags = uniqueTags();
  const filtered =
    selectedTags.length === 0
      ? posts
      : posts.filter((p) => p.tags.some((t) => selectedTags.includes(t)));

  blogRoot.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="display" style="font-size:2rem">Hyperion Blog</h1>
        <p class="muted-p">News, notes, and deep dives from the team.</p>

        <div class="tagbar">
          <div class="tags">
            ${allTags
              .map((tag) => {
                const active = selectedTags.includes(tag);
                return `<button class="tag ${active ? "tag-active" : ""}" data-tag="${tag}">${tag}</button>`;
              })
              .join("")}
          </div>
          <div class="tag-actions">
            <button class="tag-clear" ${selectedTags.length ? "" : "disabled"}>Clear</button>
          </div>
        </div>

        <div class="blog-list">
          ${filtered
            .map(
              (p) => `
            <a class="blog-card" href="#/blog/${encodeURIComponent(p.slug)}">
              <h3 class="blog-title">${p.title}</h3>
              <div class="blog-meta">${new Date(p.date).toLocaleDateString()} • ${p.tags.join(", ")}</div>
              <p class="blog-summary">${p.summary}</p>
            </a>
          `
            )
            .join("")}
          ${filtered.length === 0 ? `<p class="muted-p" style="margin-top:12px">No posts match the selected tags.</p>` : ""}
        </div>
      </div>
    </section>
  `;

  // tag interactivity
  blogRoot.querySelectorAll(".tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.getAttribute("data-tag");
      const set = new Set(selectedTags);
      set.has(t) ? set.delete(t) : set.add(t);
      const next = [...set];
      // update hash with tags: #/blog?tags=Tag1,Tag2
      window.location.hash = `#/blog?tags=${encodeURIComponent(next.join(","))}`;
    });
  });
  blogRoot.querySelector(".tag-clear")?.addEventListener("click", () => {
    window.location.hash = "#/blog";
  });
}

function BlogPostView(slug) {
  const p = posts.find((x) => x.slug === slug);
  blogRoot.innerHTML = p
    ? `
    <section class="section">
      <div class="container blog-article">
        <a href="#/blog" class="btn btn-secondary" style="margin-bottom:16px">← Back to blog</a>
        <h1 class="h2">${p.title}</h1>
        <div class="blog-meta">${new Date(p.date).toLocaleDateString()} • ${p.tags.join(", ")}</div>
        <article class="blog-content">${p.content}</article>
      </div>
    </section>
  `
    : `
    <section class="section">
      <div class="container"><p class="muted-p">Post not found.</p><a class="btn btn-secondary" href="#/blog" style="margin-top:12px">← Back</a></div>
    </section>`;
}

// router
function parseHash() {
  const h = window.location.hash.replace(/^#/, "");
  if (h.startsWith("/blog/")) return { name: "post", slug: decodeURIComponent(h.slice("/blog/".length)) };
  if (h.startsWith("/blog")) {
    // parse tags param
    const q = h.split("?")[1] || "";
    const params = new URLSearchParams(q);
    const tags = (params.get("tags") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return { name: "index", tags };
  }
  return { name: "site" };
}

function render() {
  const r = parseHash();
  if (r.name === "index") {
    BlogIndexView(r.tags || []);
    return;
  }
  if (r.name === "post") {
    BlogPostView(r.slug);
    return;
  }
  // main site: clear blog root
  blogRoot.innerHTML = "";
}

window.addEventListener("hashchange", render);
render();
