'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');//Находим в форме элемент с типом: чекбокс
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();//когда нажимаем на кнопку "Отправить" - страничка не перезагружается

        let newFilm = addInput.value;//в свойстве value - значение которое ввел пользователь
        const favorite = checkbox.checked;//свойство HTML для инпута



        if (newFilm) {//если в newFilm не пустая строка, тогда:

            if (newFilm.length > 21) { //Если название фильма больше 21, то: обрезаем и добавляем троеточие
                newFilm = `${newFilm.substring(0, 22)}...`;//берем введенное значение переменной и обрезаем до 22 символа не включительно
            }

            if (favorite == true) { //если чекбокс активирован - то:
                console.log('Добавляем любимый фильм!');
            }

            movieDB.movies.push(newFilm);//Добавляем в массив фильм, который ввел пользователь в инпут
            sortArr(movieDB.movies); //ставим функцию сортировки. Нужно стараться все делать функциями и передавать им аргументы, а не привязываться к конкретному
        
            createMovieList(movieDB.movies, movieList);//Создаем новый список фильмов, на основании измененных данных
        };
        //Условие для того чтобы избежать добавление пустых строк наш массив с фильмами
        
        
        event.target.reset();
    
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    


    

    const makeChanges = () => {
        genre.textContent = 'драма';
    
        poster.style.backgroundImage = 'url(./img/bg.jpg)';
    };


    
    const sortArr = (arr) => {
      arr.sort();  
    };


    
    function createMovieList (films, parent) {
        parent.innerHTML = '';
        sortArr(films);//избавились от вызова функции в конце и при этом каждый раз когда вызывается основная функция - наши фильмы сортируются

        films.forEach((film, i) => {
                parent.innerHTML += `
                    <li class="promo__interactive-item"> ${i + 1}. ${film}
                        <div class="delete"></div>
                    </li>
                `
        });
        //Когда мы создали все фильмы (список) - у нас создаются все корзинки (рядом с названием фильма),мы будем вешать обработчики событий на каждую из корзинок
        
        document.querySelectorAll('.delete').forEach((btn, i) => { //находим все корзинки и перебираем через forEach (кнопка и номер по порядку)
            btn.addEventListener('click', () => {
                btn.parentElement.remove();//удаляем родительский элемент (li с названием сайта) со страницы
                movieDB.movies.splice(i, 1);//удаляем один(второй аргумент) элемент из массива под номером i (итерация цикла)

                //Применяем рекурсию, чтобы нумерация фильмов также изменялась и нумерация перестраивалась

                createMovieList(films, parent)//каждый раз когда я буду удалять элемент - список будет перестраиваться заново
            });
        });

    };
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
})