const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const topButton = document.querySelector('.back-to-top');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  topButton.classList.toggle('visible', window.scrollY > 500);
});

topButton.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.disabled-link').forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});

// Map each project to its image folder/files
const projectGalleries = {
  homestay: {
    title: "Kota Belud Homestay Management System",
    images: [
      "images/homestay-01.jpg",
      "images/homestay-02.jpg",
      "images/homestay-03.jpg"
    ]
  },
  pc: {
    title: "PC Troubleshooting & Maintenance",
    images: [
      "images/pc-rufus.png",
      "images/pc-boot-sequence.jpg",
      "images/pc-boot.jpg",
      "images/motherboard-skru.jpg"
    ]
  },
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(projectKey) {
  const project = projectGalleries[projectKey];
  if (!project) return;

  document.getElementById('galleryTitle').textContent = project.title;
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  project.images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => openLightbox(project.images, i);
    grid.appendChild(img);
  });

  document.getElementById('galleryModal').classList.add('open');
}

function closeGallery() {
  document.getElementById('galleryModal').classList.remove('open');
}

function openLightbox(images, index) {
  currentGallery = images;
  currentIndex = index;
  document.getElementById('lightboxImg').src = images[index];
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
  document.getElementById('lightboxImg').src = currentGallery[currentIndex];
}

const caseStudies = {
  homestay: { //will add this later
    title: "Kota Belud Homestay Management System",
    summary: "A web-based booking and management system for homestay operators.",
    objective: "Built as part of my Software Engineering coursework to manage homestay listings and bookings digitally.",
    stack: "Laravel, PHP, MySQL, JavaScript",
    role: "Solo project — designed the database schema, built the booking logic, and developed the front-end.",
    process: [
      "Planned database structure (homestays, bookings, customers)",
      "Built backend booking logic in Laravel",
      "Developed front-end forms and admin views",
      "Tested booking flow and fixed edge cases"
    ],
    challenges: "Handling booking date conflicts was the trickiest part — had to write validation logic to prevent double-booking the same homestay on overlapping dates.",
    learned: "Learned how to structure a relational database for a real booking system, and how to write server-side validation logic in Laravel.",
    github: "#",
    demo: "#"
  }
  // add more projects here the same way
};

function openCaseStudy(key) {
  const cs = caseStudies[key];
  if (!cs) return;

  document.getElementById('caseStudyBody').innerHTML = `
    <h3>${cs.title}</h3>
    <p style="color:#8b949e; margin-bottom:20px;">${cs.summary}</p>

    <div class="cs-section"><h4>Objective</h4><p>${cs.objective}</p></div>
    <div class="cs-section"><h4>Tech Stack</h4><p>${cs.stack}</p></div>
    <div class="cs-section"><h4>My Role</h4><p>${cs.role}</p></div>
    <div class="cs-section"><h4>Process</h4><ul>${cs.process.map(step => `<li>${step}</li>`).join('')}</ul></div>
    <div class="cs-section"><h4>Challenges</h4><p>${cs.challenges}</p></div>
    <div class="cs-section"><h4>What I Learned</h4><p>${cs.learned}</p></div>

    <div class="cs-links">
      <a class="project-link" href="${cs.github}" target="_blank" rel="noopener">GitHub →</a>
      <a class="project-link" href="${cs.demo}" target="_blank" rel="noopener">Live Demo →</a>
    </div>
  `;

  document.getElementById('caseStudyModal').classList.add('open');
}

function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.remove('open');
}
