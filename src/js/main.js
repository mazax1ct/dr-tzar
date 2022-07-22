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
  $('.mods__additionals').slideUp();
  $('.js-additional').prop('checked', '');
  $('.mods__brands').slideToggle();

  return false;
});

$(document).on('change', '.js-additional', function () {
  $('.mods__brands').slideUp();
  $('.js-series').prop('checked', '');
  $('.mods__additionals').slideToggle();

  return false;
});

//открытие настроек в карточке
$(document).on('click', '.js-card-settings-opener', function () {
  $(this).next('.card__settings, .card_2__settings').addClass('is-open');
  return false;
});

//закрытие настроек в карточке
$(document).on('click', '.js-card-settings-closer', function () {
  $(this).parent('.card__settings, .card_2__settings').removeClass('is-open');
  return false;
});

//переключение дизайн/цвет
$(document).on('change', '.js-card-switch', function () {
  var container = $(this).closest('.card');
  var parent = $(this).closest('.card__switch-block');


  container.find('.card__slider.is-active').removeClass('visible');
  parent.find('.card__switch-radios.is-active').removeClass('animated'); //анимация движения
  setTimeout(function() {
    parent.find('.card__switch-radios.is-active').removeClass('visible'); //анимация фейда
    setTimeout(function() {
      container.find('.card__slider').toggleClass('is-active');
      parent.find('.card__switch-radios').toggleClass('is-active'); //переключаем блок
      setTimeout(function() {
        container.find('.card__slider.is-active').addClass('visible');
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
  var popup = $(this).attr('data-popup');
  $('.popup').hide();
  $('.' + popup).show();
  $('.popup-shade').fadeIn();

  if(popup === 'js-popup-test') {
    //обновление свайпера
    testsSlider.update();
    testsSlider2.update();
    testsSlider3.update();
    testsSlider4.update();
  }
  return false;
});

//закрытие попапа
$(document).on('click', '.js-popup-closer', function () {
  $('.popup-shade').fadeOut();
  $('.popup').hide();
  return false;
});

$(document).ready(function () {
  if ($('.js-price-slider').length) {
    var min = 72000;
    var max = 3300300;
    $(".js-price-slider").ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: min,
      to: max,
      grid: false,
      hide_min_max: true,
      onChange: function (data) {
        $('#min_price').val(data.from_pretty);
        $('#max_price').val(data.to_pretty);
        $('.popup').hide();
        $('.js-popup-warning').show();
        $('.popup-shade').fadeIn();
      }
    });

    var price_range = $(".js-price-slider").data("ionRangeSlider");

    $('#min_price, #max_price').on('change', function() {
      price_range.update({
        from: $('#min_price').val(),
          to: $('#max_price').val()
      });

      if($('#min_price').val() < min ) {
        price_range.update({
          from: $('#min_price').val(min)
        });
      }

      if($('#max_price').val() < min ) {
        price_range.update({
          from: $('#max_price').val(min)
        });
      }

      if($('#max_price').val() > max ) {
        price_range.update({
          from: $('#max_price').val(max)
        });
      }
    });
  }
});

$(document).on('click', '.js-price-reset', function () {
  $('.reset-popup').toggleClass('is-active');
  return false;
});

$(document).on('click', '.js-reset-popup-close', function () {
  $('.reset-popup').toggleClass('is-active');
  return false;
});

/*удалить*/
$(document).on('click', '.js-open-inner', function () {
  var inner = $(this).attr('data-inner');
  $(this).closest('.popup').find('.popup__inner').hide();
  $('.popup__inner[data-inner='+inner+']').show();
  return false;
});
/*удалить*/

//тоглер опций на мобилах
$(document).on('click', '.js-options-toggler', function () {
  if($('body').width() < 767) {
    $(this).find('svg').toggleClass('rotate');
    $(this).closest('.options').find('.options__inner').slideToggle();
  }
  return false;
});

//переключение опций
$(document).on('click', '.options__card', function () {
  if(!$(this).hasClass('is-active')) {
    $('.options__card').removeClass('is-active');
    $(this).addClass('is-active');

    $('.options__dropdown').slideUp();
    $('.options__dropdown[data-target="'+$(this).attr('data-target')+'"]').slideDown();
  } else {
    $('.options__dropdown').slideUp();
    $('.options__card').removeClass('is-active');
  }

  return false;
});

//откртие доп блока в опциях
$(document).on('click', '.js-add-opener', function () {
  $('.options__add-block').addClass('is-open');
  $('.options__add').addClass('is-open');
  return false;
});

//закрытие доп блока в опциях
$(document).on('click', '.js-add-closer', function () {
  $('.options__add-block').removeClass('is-open');
  $('.options__add').removeClass('is-open');
  return false;
});

//переключение в списках опций
$(document).on('click', '.options__dropdown-button', function () {
  $(this).closest('.options__dropdown-list').find('.options__dropdown-button').removeClass('is-active');
  $(this).addClass('is-active');
  return false;
});

const testsSlider = new Swiper('.js-tests-slider', {
    loop: true,
    navigation: {
        nextEl: '#tests_1_next',
        prevEl: '#tests_1_prev',
    },
    slidesPerView: 5,
    spaceBetween: 8,
    breakpoints: {
      768: {
        slidesPerView: 7,
        spaceBetween: 9
      },
      1200: {
        slidesPerView: 10,
        spaceBetween: 12,
      }
    }
});

const testsSlider2 = new Swiper('.js-tests-slider-2', {
    loop: true,
    navigation: {
      nextEl: '#tests_2_next',
      prevEl: '#tests_2_prev',
    },
    slidesPerView: 5,
    spaceBetween: 8,
    breakpoints: {
      768: {
        slidesPerView: 7,
        spaceBetween: 12
      },
      1200: {
        slidesPerView: 10,
        spaceBetween: 12,
      }
    }
});

const testsSlider3 = new Swiper('.js-tests-slider-3', {
    loop: false,
    navigation: {
      nextEl: '#tests_3_next',
      prevEl: '#tests_3_prev',
    },
    slidesPerView: 5,
    spaceBetween: 8,
    breakpoints: {
      768: {
        slidesPerView: 7,
        spaceBetween: 9
      },
      1200: {
        slidesPerView: 10,
        spaceBetween: 12,
      }
    }
});

const testsSlider4 = new Swiper('.js-tests-slider-4', {
    loop: false,
    navigation: {
      nextEl: '#tests_4_next',
      prevEl: '#tests_4_prev',
    },
    slidesPerView: 5,
    spaceBetween: 8,
    breakpoints: {
      768: {
        slidesPerView: 7,
        spaceBetween: 9
      },
      1200: {
        slidesPerView: 10,
        spaceBetween: 12,
      }
    }
});

//переключение тестов
$(document).on('click', '.js-tests', function () {
  $('.js-tests').removeClass('is-active');
  $(this).addClass('is-active');

  $('.js-tests-section').hide();
  $('.js-tests-section[data-target="'+$(this).attr("data-target")+'"]').show();

  testsSlider.update();
  testsSlider2.update();
  testsSlider3.update();
  testsSlider4.update();
  return false;
});

//откртие фильтра
$(document).on('click', '.js-tests-filter-opener', function () {
  $('.tests-filter').addClass('is-open');
  return false;
});

//закрытие фильтра
$(document).on('click', '.js-tests-filter-closer', function () {
  $('.tests-filter').removeClass('is-open');
  return false;
});

const testsSlider5 = new Swiper('.js-tests-slider-5', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 8,
    breakpoints: {
      1200: {
        spaceBetween: 12
      }
    }
});

//автосаггест
$(document).on('focus', '.tests-search__input', function () {
  $(this).closest('.tests-search').find('.tests-search__dropdown').show();
  testsSlider5.update();
});
