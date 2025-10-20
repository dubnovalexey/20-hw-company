// ===================================
// ЧАСТЬ 1: ГЛОБАЛЬНЫЕ ДАННЫЕ И DOM-ССЫЛКИ
// ===================================
const persons = [];


// Ссылки на поля ввода
const inputId = document.getElementById('id');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputBirthdate = document.getElementById('birthdate');

// Ссылки на кнопку и блок вывода
const buttonAdd = document.getElementById('add');
const statsDiv = document.getElementById('stats');

// Ссылка на блок со списком персон
const personsListDiv = document.getElementById('personsList');

// ===================================
// ЧАСТЬ 2: ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ===================================

/**
 * Рассчитывает возраст на основе даты рождения.
 */
function calculateAge(birthdateString) {
    const today = new Date();
    const birthDate = new Date(birthdateString);

    let age = today.getFullYear() - birthDate.getFullYear();

    // Корректировка, если день рождения в этом году еще не наступил
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 * Рассчитывает и обновляет статистику в блоке statsDiv.
 */
function updateStats() {
    // 4.1. Получаем массив возрастов (используем .map())
    const ages = persons.map(p => p.age);

    // Если список пуст, нечего считать
    if (ages.length === 0) {
        statsDiv.innerHTML = '<h2>Статистика</h2><p>Всего персон: 0</p>';
        return;
    }

    // 4.2. Общее количество
    const totalPersons = ages.length;

    // 4.3. Сумма и Средний возраст (используем .reduce())
    const sumOfAges = ages.reduce((acc, curr) => acc + curr, 0);
    const averageAge = sumOfAges / totalPersons;

    // 4.4. Мин/Макс Возраст (используем Spread Operator ...)
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    // 5.1. Формирование HTML (используем Шаблонные Строки)
    const statsHTML = `
        <h2>Статистика</h2>
        <p>Мин. возраст: ${minAge}</p>
        <p>Макс. возраст: ${maxAge}</p>
        <p>Средний возраст: ${averageAge.toFixed(2)}</p>
        <p>Всего персон: ${totalPersons}</p>
    `;

    // 5.2. Вставка HTML в DOM
    statsDiv.innerHTML = statsHTML;
}

//  Генерирует и отображает список всех персон.
function renderPersonsList() {
    if (persons.length === 0) {
        personsListDiv.innerHTML = '<h2>Список персон</h2><p>Нет добавленных персон.</p>';
        return;
    }
    // 1. Создаем массив HTML-строк с помощью .map()
    const listItemsHTML = persons.map(p => {
        return `<li>ID: ${p.id}, Name: ${p.firstName} ${p.lastName}, Birthdate: ${p.birthdate}, Age: ${p.age}
<button class="delete-button" data-id="${p.id}">Удалить</button></li>`;
    })
    // 2. Объединение массива строк в одну, обернутую в <ul>
    const finalHTML = `<ul>${listItemsHTML.join('')}</ul>`;

    // 3. Вставка в DOM
    personsListDiv.innerHTML = '<h2>Список персон</h2>' + finalHTML;
}

// Обновление списка персон при каждом изменении массива
// ===================================
// ЧАСТЬ 3: ОСНОВНАЯ ЛОГИКА (Обработчик событий)
// ===================================

buttonAdd.addEventListener('click', function () {
    // 1. Сбор данных
    const id = inputId.value.trim();
    const firstName = inputFirstName.value.trim();
    const lastName = inputLastName.value.trim();
    const birthdateStr = inputBirthdate.value;
    const today = new Date();
    const birthDate = new Date(birthdateStr);



    // Проверка, что ID является положительным числом
    if (isNaN(Number(id)) || Number(id) <= 0) {
        alert('ID должен быть положительным числом!');
        return;
    }

    // Проверка, что Имя и Фамилия не являются только числами
    if (!isNaN(Number(firstName)) || !isNaN(Number(lastName))) {
        alert('Имя и Фамилия не могут состоять только из цифр!');
        return;
    }
    // Проверка, что имя и фамилия строки
    if (firstName !== String(firstName) || lastName !== String(lastName)) {
        alert('Имя и Фамилия должны быть строками!');
        return;
    }
// Проверка, что имя и фамилия не менее 2 символов
    if (firstName.length < 2 || lastName.length < 2) {
        alert('Имя и Фамилия должны быть не менее 2 символов!');
        return;
    }
// Проверка, что имя и фамилия не более 50 символов
    if (firstName.length > 50 || lastName.length > 50) {
        alert('Имя и Фамилия должны быть не более 50 символов!');
        return;
    }


    // Проверка на минимальную дату рождения
    if (birthDate <= new Date('1900-01-01')) {
        alert('Дата рождения должна быть позже 01.01.1900!');
        return;
    }

    // Проверка на корректность даты рождения
    if (isNaN(birthDate.getTime())) {
        alert('Некорректная дата рождения!');
        return;
    }
    if (birthDate > today) {
        alert('Дата рождения не может быть в будущем!');
        return;
    }

    // Проверка на уникальность ID
    if (persons.some(p => p.id === id)) {
        alert(`Персона с ID = ${id} уже существует!`);
        return;
    }


    // 2. Расчет возраста
    const age = calculateAge(birthdateStr);

    // 3. Создание объекта
    const person = {id, firstName, lastName, birthdate: birthdateStr, age};

    // 4. Добавление в массив
    persons.push(person);

    // 5. Расчет и обновление статистики
    updateStats();

    // 6. Обновление списка персон
    renderPersonsList();

    // 7. Очистка полей ввода для следующего ввода
    inputId.value = '';
    inputFirstName.value = '';
    inputLastName.value = '';
    inputBirthdate.value = '';
});
// Делегирование события для кнопок "Удалить"
personsListDiv.addEventListener('click', function (event) {
    // 1. Проверяем, что клик был по кнопке 'delete-button'
    if (event.target.classList.contains('delete-button')) {

        // 2. Получаем ID для удаления из атрибута data-id
        const idToDelete = event.target.getAttribute('data-id');

        // 3. Находим индекс элемента в массиве
        const index = persons.findIndex(p => p.id === idToDelete);

        // Проверка: если элемент найден (индекс не равен -1)
        if (index !== -1) {

            // 4. Удаляем элемент из массива (мутабельное удаление)
            persons.splice(index, 1);

            // 5. Обновляем UI (статистика и список)
            updateStats();
            renderPersonsList();
        }
    }
});
