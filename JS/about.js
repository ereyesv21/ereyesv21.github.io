document.addEventListener("DOMContentLoaded", function () {
  const prevButtons = document.querySelectorAll('.arrow.prev');
  const nextButtons = document.querySelectorAll('.arrow.next');
  const carousels = document.querySelectorAll('.carousel');
  const titles = document.querySelectorAll('.section-title-inline-family, .section-title-inline-clients');

  function toggleVisibilityOnScroll() {
      const scrollTop = window.scrollY;

      if (scrollTop > 0) {
          carousels.forEach(carousel => carousel.style.opacity = "1");
          titles.forEach(title => title.style.opacity = "1");
      } else {
          carousels.forEach(carousel => carousel.style.opacity = "0");
          titles.forEach(title => title.style.opacity = "0");
      }
  }

  toggleVisibilityOnScroll();

  window.addEventListener("scroll", toggleVisibilityOnScroll);

  function moveCarousel(carousel, direction) {
      const content = carousel.querySelector('.carousel-content');

      if (direction === 'next') {
          content.appendChild(content.firstElementChild);
          content.style.transform = "translateX(0)";
      } else if (direction === 'prev') {
          content.insertBefore(content.lastElementChild, content.firstElementChild);
          content.style.transform = "translateX(0)";
      }
  }

  nextButtons.forEach(button => {
      button.addEventListener('click', function () {
          const carousel = this.closest('.carousel');
          moveCarousel(carousel, 'next');
      });
  });

  prevButtons.forEach(button => {
      button.addEventListener('click', function () {
          const carousel = this.closest('.carousel');
          moveCarousel(carousel, 'prev');
      });
  });
});