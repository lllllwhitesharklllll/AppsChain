// ==================== 1. МОБИЛЬНОЕ МЕНЮ И ЯЗЫКИ (ТАЧ-УСТРОЙСТВА И АДАПТИВ) ====================
document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.header__burger-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  const container = document.querySelector('.header__container');

  // Элементы для переноса
  const menu = document.querySelector('.header__menu');
  const langBlock = document.querySelectorAll('.lang');
  const phone = document.querySelector('.header__phone'); // ДОБАВЛЕНО: находим телефон, чтобы использовать как ориентир

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Функция адаптивного переноса элементов шапки
  function checkWindowWidth() {
    if (window.innerWidth <= 1000) {
      // Переносим только языки и меню
      if (mobileMenu && !mobileMenu.contains(menu)) {
        langBlock.forEach(l => mobileMenu.appendChild(l)); 
        if (menu) mobileMenu.appendChild(menu);           
      }
    } else {
      // ИСПРАВЛЕНО: Возвращаем языки и меню обратно на ПК в строго правильной последовательности
      if (mobileMenu && mobileMenu.contains(menu)) {
        
        // 1. Возвращаем меню на законное десктопное место — строго ПЕРЕД телефоном
        if (menu && phone) container.insertBefore(menu, phone);
        
        // 2. Возвращаем блок языков на место — после телефона, но ПЕРЕД бургером
        langBlock.forEach(l => container.insertBefore(l, burgerIcon)); 
        
        // Сбрасываем активные мобильные классы
        if (burgerIcon) burgerIcon.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
    }
  }

  window.addEventListener('resize', checkWindowWidth);
  checkWindowWidth(); 

  if (burgerIcon && mobileMenu) {
    burgerIcon.addEventListener('click', function (event) {
      event.stopPropagation();
      burgerIcon.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('no-scroll');
    });
  }

  const menuItems = document.querySelectorAll('.menu__item--dropdown');
  menuItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
      if (isTouchDevice || window.innerWidth <= 1000) {
        if (event.target.classList.contains('arrow') || event.target.closest('.menu__link')) {
          event.preventDefault();
          event.stopPropagation();
          
          langBlock.forEach(l => l.classList.remove('is-open'));
          item.classList.toggle('is-open');
        }
      }
    });
  });

  langBlock.forEach(function (lang) {
    lang.addEventListener('click', function (event) {
      if (isTouchDevice || window.innerWidth <= 1000) {
        if (event.target.closest('.lang__current') || event.target.classList.contains('arrow')) {
          event.preventDefault();
          event.stopPropagation();

          menuItems.forEach(i => i.classList.remove('is-open'));
          lang.classList.toggle('is-open');
        }
      }
    });
  });

  document.addEventListener('click', function (event) {
    const target = event.target;

    menuItems.forEach(function (item) {
      if (!item.contains(target) && !target.classList.contains('arrow') && !target.closest('.menu__link')) {
        item.classList.remove('is-open');
      }
    });

    langBlock.forEach(function (lang) {
      if (!lang.contains(target) && !target.closest('.lang__current') && !target.classList.contains('arrow')) {
        lang.classList.remove('is-open');
      }
    });
  });
});


// ==================== 2. СЛАЙДЕРЫ (БЛОКИ SERVICES И TEAM) ====================
$(document).ready(function(){
    
    function initServicesSlider() {
        const $servicesSlider = $('.services__swiper-wrapper'); 
        if ($servicesSlider.length === 0) return;

        if (window.innerWidth > 830) {
            if (!$servicesSlider.hasClass('slick-initialized')) {
                $servicesSlider.slick({ dots: true });
            }
        } else {
            if ($servicesSlider.hasClass('slick-initialized')) {
                $servicesSlider.slick('unslick');
            }
        }
    }

    function initTeamSlider() {
        const $teamSlider = $('.team__swiper-wrapper');
        if ($teamSlider.length === 0) return;

        if (window.innerWidth > 830) {
            if (!$teamSlider.hasClass('slick-initialized')) {
                $teamSlider.slick({
                    dots: true,
                    slidesToShow: 2,     
                    slidesToScroll: 1,   
                    swipeToSlide: false, 
                    infinite: true       
                });
            }
        } else {
            if ($teamSlider.hasClass('slick-initialized')) {
                $teamSlider.slick('unslick');
            }
        }
    }

    initServicesSlider();
    initTeamSlider();

    let resizeId;
    $(window).on('resize', function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(function() {
            initServicesSlider();
            initTeamSlider();
        }, 100); 
    });
});
