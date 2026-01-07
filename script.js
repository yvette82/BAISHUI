const itemsToObserve = document.querySelectorAll('.section, .timeline-item');

if (itemsToObserve.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.1
  });

  itemsToObserve.forEach(item => observer.observe(item));
}

let lastScrollTop = 0;
const delta = 5;
const navbar = document.querySelector('.navbar');
const mainNav = document.querySelector('.main-nav');

if (navbar) {
  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add('nav-up');
      if (mainNav) mainNav.classList.add('nav-up');
    } else if (lastScrollTop - scrollTop > delta) {
      navbar.classList.remove('nav-up');
      if (mainNav) mainNav.classList.remove('nav-up');
    }

    if (scrollTop <= 0) {
      navbar.classList.remove('nav-up');
      if (mainNav) mainNav.classList.remove('nav-up');
    }

    lastScrollTop = scrollTop;
  }, false);
}

const menuIcon = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close-btn');
const sideMenu = document.querySelector('.side-menu');
const overlay = document.querySelector('.menu-overlay');

if (menuIcon && sideMenu && closeBtn && overlay) {
  menuIcon.addEventListener('click', () => {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
  });

  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

const menus = document.querySelectorAll('.menu');

if (menus.length > 0) {
  const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.1 });

  menus.forEach(menu => menuObserver.observe(menu));
}

const carouselInner = document.querySelector('.carousel-inner');
const slideInputs = document.querySelectorAll('input[name="slider"]');
const dots = document.querySelectorAll('.dot');

if (carouselInner && slideInputs.length > 0) {
  let currentIndex = 0;
  const totalOriginalSlides = 4;
  const intervalTime = 4000;

  function moveToNext() {
    currentIndex++;

    carouselInner.style.transition = "transform 0.6s ease-in-out";
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

    const dotIndex = currentIndex % totalOriginalSlides;
    slideInputs[dotIndex].checked = true;

    if (currentIndex === totalOriginalSlides) {
      setTimeout(() => {
        carouselInner.style.transition = "none";
        currentIndex = 0;
        carouselInner.style.transform = `translateX(0%)`;
      }, 600);
    }
  }

  let autoPlay = setInterval(moveToNext, intervalTime);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(autoPlay);
      currentIndex = index;
      carouselInner.style.transition = "transform 0.6s ease-in-out";
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      autoPlay = setInterval(moveToNext, intervalTime);
    });
  });
}
