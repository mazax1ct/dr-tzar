const gamesSlider = new Swiper('.js-games-slider', {
    loop: true,
    navigation: {
        nextEl: '.js-games-next',
        prevEl: '.js-games-prev',
    },
    slidesPerView: 4,
    spaceBetween: 4,
    breakpoints: {
        768: {
            slidesPerView: 6,
            spaceBetween: 0
        },
        1200: {
            slidesPerView: 9,
            spaceBetween: 4
        },
        1900: {
            slidesPerView: 9,
            spaceBetween: 8
        },
        2500: {
            slidesPerView: 9,
            spaceBetween: 16
        }
    }
});

const designSlider = new Swiper('.js-design-slider', {
    loop: true,
    navigation: {
        nextEl: '.js-design-slider .swiper-button-next',
        prevEl: '.js-design-slider .swiper-button-prev',
    },
    slidesPerView: 1,
    observer: true,
    observeParents: true
});

const configsSlider = new Swiper('.js-configs-slider', {
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
    navigation: {
        nextEl: '.js-configs-next',
        prevEl: '.js-configs-prev'
    },
    slidesPerView: 1,
    breakpoints: {
        1200: {
            allowTouchMove: false,
            shortSwipes: false,
            simulateTouch: false,
            slidesPerView: 2,
            spaceBetween: 16
        },
        1900: {
            allowTouchMove: false,
            shortSwipes: false,
            simulateTouch: false,
            slidesPerView: 2,
            spaceBetween: 56
        },
        2500: {
            allowTouchMove: false,
            shortSwipes: false,
            simulateTouch: false,
            slidesPerView: 2,
            spaceBetween: 88
        }
    }
});

//тоглер параметров на мобилах
$(document).on('click', '.js-params-toggler', function () {
  if($('body').width() < 767) {
    $(this).find('svg').toggleClass('rotate');
    $(this).next('.params__inner').slideToggle();
  }
  return false;
});

//тултипы
$(document).on('click', '.info', function () {
  if($(this).hasClass('is-open')) {
    $(this).removeClass('is-open');
  } else {
    $(this).addClass('is-open');
  }
  return false;
});

//откртие фильтра
$(document).on('click', '.js-filter-opener', function () {
  $('.games__filter').addClass('is-open');
  return false;
});

//закрытие фильтра
$(document).on('click', '.js-filter-closer', function () {
  $('.games__filter').removeClass('is-open');
  return false;
});

//выбор игры
$(document).on('click', '.games__game', function () {
  $(this).toggleClass('is-active');
  return false;
});

//тоглер модов на мобилах
$(document).on('click', '.js-mods-toggler', function () {
  if($('body').width() < 767) {
    $(this).find('svg').toggleClass('rotate');
    $(this).next('.mods__inner').slideToggle();
  }
  return false;
});

//тоггл брендов
$(document).on('change', '.js-series', function () {
  $('.mods__brands').slideToggle();
  return false;
});

//открытие настроек в карточке
$(document).on('click', '.js-card-settings-opener', function () {
  $(this).next('.card__settings').addClass('is-open');
  return false;
});

//закрытие настроек в карточке
$(document).on('click', '.js-card-settings-closer', function () {
  $(this).parent('.card__settings').removeClass('is-open');
  return false;
});

//переключение дизайн/цвет
$(document).on('change', '.js-card-switch', function () {
  var container = $(this).closest('.card');
  var parent = $(this).closest('.card__switch-block');


  container.find('.card__slider.is-active').removeClass('animated visible');
  parent.find('.card__switch-radios.is-active').removeClass('animated'); //анимация движения
  setTimeout(function() {
    parent.find('.card__switch-radios.is-active').removeClass('visible'); //анимация фейда
    setTimeout(function() {
      container.find('.card__slider').toggleClass('is-active');
      parent.find('.card__switch-radios').toggleClass('is-active'); //переключаем блок
      setTimeout(function() {
        container.find('.card__slider.is-active').addClass('visible animated');
        parent.find('.card__switch-radios.is-active').addClass('visible'); //анимация фейда
        setTimeout(function() {
          parent.find('.card__switch-radios.is-active').addClass('animated'); //анимация движения
        },100);//ждём завершиния анимации фейда
      },100); //ждём переключение блока
    },300); //ждём завершиния анимации фейда
  },300); //ждём завершиния анимации
  return false;
});

//открытие попапа
$(document).on('click', '.js-popup-opener', function () {
  $('.popup-shade').fadeIn();
  return false;
});

//закрытие попапа
$(document).on('click', '.js-popup-closer', function () {
  $('.popup-shade').fadeOut();
  return false;
});
