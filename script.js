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
      "images/pc-01.jpg",
      "images/pc-02.jpg"
    ]
  }
  // add more projects here the same way
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
