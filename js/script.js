// Создание переменных для брейкпоинтов
const mediaQuery1270 = window.matchMedia('(max-width: 1270px)');
const mediaQuery767 = window.matchMedia('(max-width: 767px)');

// Кастомизация селекта
const element = document.querySelector('#author-select');
const choices = new Choices(element, {
  searchEnabled: false
});

function removeIsHighlighted() {
  const highlightedFirst = document.querySelector('#choices--author-select-item-choice-1');
  highlightedFirst.classList.remove('is-highlighted')
}

removeIsHighlighted();

// Выпадающее меню поиска
document.getElementById('open-search-form').addEventListener('click', function(event) {
  document.getElementById('search-form').classList.add('search-form-show')
})

document.getElementById('open-search-form').addEventListener('click', function(event) {
    event._isClick = true
})

document.getElementById('search-form').addEventListener('click', function(event) {
  event._isClick = true
})

document.body.addEventListener('click', function(event) {
  if (event._isClick == true) return
  document.getElementById('search-form').classList.remove('search-form-show')
})

// Кнопки play для header и podcasts
function removePauseBroadcast() {
  const pauseBroadcatsBtn = document.querySelector('.header__broadcast-content .header__broadcast-btn-pause');
  if (pauseBroadcatsBtn) {
    pauseBroadcatsBtn.classList.remove('header__broadcast-btn-pause');
    pauseBroadcatsBtn.classList.add('header__broadcast-play-hover');
}}

function removePausePodcasts() {
  const pausePodcastsBtn = document.querySelector('.podcasts__list .podcasts__btn-pause');
  if (pausePodcastsBtn) {
    pausePodcastsBtn.classList.remove('podcasts__btn-pause');
    pausePodcastsBtn.classList.add('podcasts__btn--hover');
}}

document.querySelector('.header__bottom-container').addEventListener('click', function (event) {
  if (event.target.classList.contains('header__broadcast-play')) {
    if (event.target.classList.contains('header__broadcast-play-hover')) {
      removePausePodcasts();
      removePauseBroadcast();
      event.target.classList.add('header__broadcast-btn-pause');
      event.target.classList.remove('header__broadcast-play-hover');
    } else {
      event.target.classList.add('header__broadcast-play-hover');
      event.target.classList.remove('header__broadcast-btn-pause');
    }
  }
})

document.querySelector('.podcasts__list').addEventListener('click', function (event) {
  if (event.target.classList.contains('podcasts__btn')) {
    if (event.target.classList.contains('podcasts__btn--hover')) {
      removePausePodcasts();
      removePauseBroadcast();
      event.target.classList.add('podcasts__btn-pause');
      event.target.classList.remove('podcasts__btn--hover');
    } else {
      event.target.classList.add('podcasts__btn--hover');
      event.target.classList.remove('podcasts__btn-pause');
    }
  }
})

// Форма авторизации
let authorization = document.querySelector('.header__authorization-btn');
let menu = document.querySelector('.header__authorization-form');
let menuClose = document.querySelector('.header__authForm-close');

authorization.addEventListener('click',
  function () {
    menu.classList.add('form-visible');
    document.body.classList.add('background-blackout');
})

menuClose.addEventListener('click',
  function () {
    menu.classList.remove('form-visible');
    document.body.classList.remove('background-blackout');
})

// Валидация формы авторизации
let validationAutorization = new JustValidate('#authorization-form', {
  errorLabelStyle: {
    color: 'red'
  }
})

validationAutorization.addField('#login', [
  {
    rule: 'required',
    errorMessage: 'Это поле обязательно для заполнения'
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Минимум 2 символа'
  },
])
validationAutorization.addField('#password', [
  {
    rule: 'required',
    errorMessage: 'Это поле обязательно для заполнения'
  },
  {
    rule: 'password',
    errorMessage: 'Пароль должен содержать минимум 6 символов'
  }
])

// Еще подкасты
document.querySelector('.podcasts__btn-more').addEventListener('click',
  function () {
    const items = document.querySelectorAll('.podcasts__list-item')
    const list = document.querySelector('.podcasts__list')
    for (let i = 0; i < 4; i++) {
      list.append(items[i].cloneNode(true))
    }
})

// Аккордеон, секция Гости
new Accordion('.guests__accordion-list', {
  openOnInit: [0],
  collapse: true,
});

// Гости - табы
document.querySelectorAll('.guests__ac-btn').forEach(function (tabsBtn) {

  tabsBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.guests__ac-btn').forEach(function (btn) {
      btn.classList.remove('tab-focused')
    });
    e.currentTarget.classList.add('tab-focused');
    document.querySelectorAll('.guests__card-content').forEach(function (tabsBtn) {
      tabsBtn.classList.remove('guests__card-content--active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('guests__card-content--active');
  });
});

// Слайдер
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 2.52,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1023: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1270: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
});

// Валидатор формы, секция about
let validation = new JustValidate('#form', {
  errorLabelStyle: {
    color: 'red'
  }
})

validation.addField('#myTextarea', [
  {
    rule: 'required',
    errorMessage: 'Это поле обязательно для заполнения'
  },
  {
    rule: 'minLength',
    value: 10,
    errorMessage: 'Минимальная длина текста - 10 символов'
  },
  {
    rule: 'maxLength',
    value: 100,
    errorMessage: 'Максимальная длина текста - 100 символов'
  },
])
validation.addField('#name', [
  {
    rule: 'required',
    errorMessage: 'Это поле обязательно для заполнения'
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Минимум 2 символа'
  },
  {
    rule: 'customRegexp',
    value: /[а-я]/gi,
    errorMessage: 'Ошибка'
  }
])
validation.addField('#email', [
  {
    rule: 'required',
    errorMessage: 'Это поле обязательно для заполнения'
  },
  {
    rule: 'email',
    errorMessage: 'Ошибка в указании почты'
  },
])

// media 1270px (1024px)
// Перемещение плэйлистов на адаптиве 1270px
const playlistsContainer = document.querySelector('.playlists__container')
const playlistsInformation = document.querySelector('.playlists__information');
const playlistsContent = document.querySelector('.playlists__content');
const playlistsCheckbox = document.querySelector('.playlists__checkbox');

function movePlaylistsContent() {
  if (mediaQuery1270.matches) {
    playlistsInformation.insertBefore(playlistsContent, playlistsCheckbox.nextSibling);
  } else {
    playlistsContainer.appendChild(playlistsContent);
  }
}

movePlaylistsContent();
window.addEventListener('resize', () => {movePlaylistsContent();});

// media 1023px (768px)
// Бургер меню
const burgerButton = document.querySelector('.header__burger');
const menuBurger = document.querySelector('.header__main-list');
const menuLinks = document.querySelectorAll('.header__main-link');
const menuSecondary = document.querySelector('.header__secondary-list');
const menuSecondLinks = document.querySelectorAll('.header__secondary-link');

menuBurger.setAttribute('aria-hidden', 'true');
menuSecondary.setAttribute('aria-hidden', 'true');

burgerButton.addEventListener('click', () => {
  const isMobile = mediaQuery767.matches;

  burgerButton.classList.toggle('header__burger--active');
  menuBurger.classList.toggle('header__main-list--active');
  document.body.classList.toggle('stop-scroll');

  if (isMobile) {
    menuSecondary.classList.toggle('header__secondary-list--active');

    menuSecondLinks.forEach((el) => {
      el.addEventListener('click', () => {
        burgerButton.classList.remove('header__burger--active');
        menuBurger.classList.remove('header__main-list--active');
        menuSecondary.classList.remove('header__secondary-list--active');
        document.body.classList.remove('stop-scroll');
        menuBurger.removeAttribute('aria-hidden');
        menuSecondary.removeAttribute('aria-hidden');
      });
    });
  // } else {
    menuLinks.forEach((el) => {
      el.addEventListener('click', () => {
        burgerButton.classList.remove('header__burger--active');
        menuBurger.classList.remove('header__main-list--active');
        menuSecondary.classList.remove('header__secondary-list--active');
        document.body.classList.remove('stop-scroll');
        menuBurger.removeAttribute('aria-hidden');
        menuSecondary.removeAttribute('aria-hidden');
      });
    });
  }
});

// Перемещение передач на адаптиве 1023px (768px)
const container = document.querySelector('.broadcasts__container');
const pictureMic = document.querySelector('.broadcasts__picture-mic');
const archiveBtn = document.querySelector('.broadcasts__btn');
const archiveDescr = document.querySelector('.broadcasts__archive-descr');
const contentInfo = document.querySelector('.broadcasts__content-info');
const authorSelectionForm = document.querySelector('.broadcasts__author-selection-form');
const broadcasts__content768 = document.createElement('div');
const broadcasts__content768_1 = document.createElement('div');
const broadcasts__content768_2 = document.createElement('div');
let moved = false;

broadcasts__content768.classList.add('broadcasts__content-768');
broadcasts__content768_1.classList.add('broadcasts__content-768-1');
broadcasts__content768_2.classList.add('broadcasts__content-768-2');
broadcasts__content768.appendChild(broadcasts__content768_1);
broadcasts__content768.appendChild(broadcasts__content768_2);

function moveElements() {
  if (window.innerWidth <= 1023 && !moved) {
    broadcasts__content768_1.appendChild(pictureMic);
    broadcasts__content768_2.appendChild(archiveBtn);
    broadcasts__content768_2.appendChild(archiveDescr);
    container.after(broadcasts__content768);
    moved = true;
  } else if (window.innerWidth > 1023 && moved) {
    contentInfo.insertBefore(archiveDescr, authorSelectionForm.nextSibling);
    contentInfo.insertBefore(archiveBtn, authorSelectionForm.nextSibling);
    contentInfo.insertBefore(pictureMic, authorSelectionForm.nextSibling);
    container.parentNode.removeChild(broadcasts__content768);
    moved = false;
  }
}
moveElements();
window.addEventListener('resize', moveElements);

// media 767px (320px)
// Перенос кнопки "Войти"
const hiddenLogo = document.querySelector('.header__hidden-logo');
const headerAuthoBtn = document.querySelector('.header__authorization-btn');
const headerSearchForm = document.querySelector('.header__search-form');

function moveAuthoBtn() {
  if (mediaQuery767.matches) {
    hiddenLogo.after(headerAuthoBtn);
  } else {
    headerSearchForm.after(headerAuthoBtn);
  }
}
moveAuthoBtn();
window.addEventListener('resize', moveAuthoBtn);

// Аккордеон header 767px (320px)
function broadcastAccordion767() {
  if (mediaQuery767.matches) {
    new Accordion('.header__broadcast-container');
  }
}
broadcastAccordion767();
window.addEventListener('resize', broadcastAccordion767);

// Перемещение блока навигации вне контейнера, для 767px (320px)
const footer = document.querySelector('.footer');
const footerContMain = document.querySelector('.footer__container');
const footerContTop = document.querySelector('.footer__container-top');
const footerContBottom = document.querySelector('.footer__container-bottom');
const footerNav = document.querySelector('.footer__navigation-list');

function moveFN() {
  if (mediaQuery767.matches) {
    footer.insertBefore(footerNav, footerContMain.nextSibling)
  } else {
    footerContMain.appendChild(footerNav)
  }
}
moveFN();
window.addEventListener('resize', moveFN);
