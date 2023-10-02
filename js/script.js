'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list');

adv.forEach(item => {
    item.remove();
});

genre.textContent = 'драма';

poster.style.backgroundImage = 'url(./img/bg.jpg)';

movieList.innerHTML = '';

movieDB.movies.sort();



movieDB.movies.forEach((film, i) => { // i - номер повторений цикла, начинается с 0. Поэтому чтобы вывести номер по порядку фильма мы пишем i + 1; 
    movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
    `;//forEach повторится 5 раз(сколько movies в movieDB) и будет такая структура которая в forEach
});//каждый раз когда цикл повторяется мы в innerHTML будем добавлять какие-то строки
