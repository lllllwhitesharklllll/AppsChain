//Стрелки (блок Header)
document.addEventListener('DOMContentLoaded', function () {

    // Находим пункты меню, у которых есть выпадашка
    const menuItems = document.querySelectorAll('.menu__item--dropdown');

    menuItems.forEach(function (item) {

        // Вешаем клик на весь пункт меню
        item.addEventListener('click', function (event) {

            // Проверяем: если ширина экрана мобильная (меньше или равна 1024px)
            if (window.innerWidth <= 1024) {

                // Проверяем, куда именно нажал пользователь
                if (event.target.classList.contains('arrow') || event.target.closest('.menu__link')) {

                    // Отменяем стандартный переход по ссылке
                    event.preventDefault();

                    // Запрещаем клику "лететь" дальше
                    event.stopPropagation();

                    // Переключаем класс открытия меню
                    item.classList.toggle('is-open');
                }
            }
        });
    });

    // Если меню открыто, и кликнули в любое другое пустое место — закрываем его
    document.addEventListener('click', function () {
        menuItems.forEach(function (item) {
            item.classList.remove('is-open');
        });
    });
});

//Слайдеры (блоки services и Team)
$(document).ready(function(){
    
    // 1. Контроль первого слайдера (блок services)
    function initServicesSlider() {
        // ИСПРАВЛЕНО: Теперь класс точно соответствует вашему HTML (.services__swiper-wrapper)
        const $servicesSlider = $('.services__swiper-wrapper'); 

        // Проверяем, существует ли элемент на странице
        if ($servicesSlider.length === 0) return;

        if (window.innerWidth > 830) {
            // Если экран большой и слайдер ЕЩЕ НЕ запущен — запускаем
            if (!$servicesSlider.hasClass('slick-initialized')) {
                $servicesSlider.slick({
                    dots: true
                });
            }
        } else {
            // Если экран маленький и слайдер БЫЛ запущен — принудительно его уничтожаем
            if ($servicesSlider.hasClass('slick-initialized')) {
                $servicesSlider.slick('unslick');
            }
        }
    }

    // 2. Контроль второго слайдера (блок Team)
    function initTeamSlider() {
        const $teamSlider = $('.team__swiper-wrapper');

        // Проверяем, существует ли элемент на странице
        if ($teamSlider.length === 0) return;

        if (window.innerWidth > 830) {
            // Если экран большой и слайдер ЕЩЕ НЕ запущен — запускаем
            if (!$teamSlider.hasClass('slick-initialized')) {
                $teamSlider.slick({
                    dots: true,
                    slidesToShow: 2,     // Показываем 2 карточки одновременно
                    slidesToScroll: 1,   // Перелистываем строго по 1 карточке
                    swipeToSlide: false, // Запрещаем свободную остановку посередине
                    infinite: true       // Бесконечная прокрутка
                });
            }
        } else {
            // Если экран маленький и слайдер БЫЛ запущен — принудительно его уничтожаем
            if ($teamSlider.hasClass('slick-initialized')) {
                $teamSlider.slick('unslick');
            }
        }
    }

    // Запускаем оба слайдера при первой загрузке страницы
    initServicesSlider();
    initTeamSlider();

    // Отслеживаем изменение размеров экрана с небольшой задержкой
    let resizeId;
    $(window).on('resize', function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(function() {
            initServicesSlider();
            initTeamSlider();
        }, 100); // Проверка экрана через 100мс после окончания ресайза
    });
});
