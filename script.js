
// TODO Homework: continue develop classes Person, Employee, Company
// Hint: thinking in OOD (Object Oriented Design). NB! Encapsulation
const firm = new Company();

// === 1. ПОЛУЧЕНИЕ ССЫЛОК НА DOM-ЭЛЕМЕНТЫ ===

// Поля ввода (Input)
const inputId = document.getElementById('id');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputBirthDate = document.getElementById('birthdate'); // ИСПРАВЛЕННЫЙ ID
const inputSalary = document.getElementById('salary');

// Кнопки (Button)
const buttonAdd = document.getElementById('add');
const listEmployeesDiv = document.getElementById('listEmployees');
const statsDiv = document.getElementById('stats');

// === 2. ОБРАБОТЧИКИ СОБЫТИЙ ===

// Обработчик клика по кнопке "Add Employee"
buttonAdd.addEventListener(`click`, handleAddEmployee);


function handleAddEmployee(event) {
    // Считываем значения из полей ввода
    const id = inputId.value.trim();
    const firstName = inputFirstName.value.trim();
    const lastName = inputLastName.value.trim();
    const birthDateStr = inputBirthDate.value; // Строка даты
    const salary = parseFloat(inputSalary.value);

    // 1. Валидация общих полей и зарплаты (ОБЯЗАТЕЛЬНО)
    if (!id || !firstName || !lastName || isNaN(salary) || salary <= 0 || !birthDateStr) {
        alert('All fields must be filled correctly! Salary must be a positive number.');
        return;
    }

    // 2. Дополнительная валидация ID (должен быть числом)
    if (isNaN(Number(id))) {
        alert('ID must be a number.');
        return;
    }

    // 3. Валидация даты (валидность и логические границы)
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    const minValidDate = new Date('1900-01-01'); // Проверка: не раньше 1900 года

    if (isNaN(birthDate.getTime())) {
        alert('Invalid date format.');
        return;
    }
    if (birthDate >= today) { // Дата не может быть в будущем
        alert('Birthdate cannot be in the future.');
        return;
    }
    if (birthDate < minValidDate) {
        alert('Birthdate cannot be earlier than 1900.');
        return;
    }


    // Создаем нового сотрудника
    const newEmployee = new Employee(id, firstName, lastName, birthDateStr, salary);

    // Пытаемся добавить сотрудника в компанию
    const added = firm.addEmployee(newEmployee);
    if (!added) {
        alert(`Employee with ID ${id} already exists!`);
        return;
    }

    // Обновляем отображение списка сотрудников и статистики
    renderEmployeeList();
    renderStats();

    // Очищаем поля ввода
    inputId.value = '';
    inputFirstName.value = '';
    inputLastName.value = '';
    inputBirthDate.value = '';
    inputSalary.value = '';
}

function renderEmployeeList() {
    const employees = firm.employees;
    listEmployeesDiv.innerHTML = ''; // Очищаем родителя

    // Используем toHTML()
    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.style.marginBottom = '10px';

        // Используем toHTML() для вставки данных
        employeeDiv.innerHTML = employee.toHTML();

        // Создаем кнопку удаления
        const deleteButton = createButtonDel(() => {
            // 1. УДАЛЕНИЕ ИЗ КОМПАНИИ
            firm.removeEmployee(employee.id);
            // 2. ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ
            renderEmployeeList();
            renderStats();
        });

        employeeDiv.appendChild(deleteButton);
        listEmployeesDiv.appendChild(employeeDiv);
    });
}

function renderStats() {
    statsDiv.innerHTML = '';

    // Получаем статистику через геттер класса Company
    const stats = firm.stats;

    // БЛОК ПРОВЕРКИ НА ПУСТОТУ (геттер возвращает null, если список пуст)
    if (stats === null) {
        statsDiv.appendChild(createInfoElement('No employees in the company.', 'p'));
        return;
    }

    // Отображаем статистику, используя данные из объекта stats
    statsDiv.appendChild(createInfoElement(`Total Employees: ${stats.totalEmployees}`, 'p'));
    statsDiv.appendChild(createInfoElement(`Average Salary: $${stats.averageSalary.toFixed(2)}`, 'p'));
    statsDiv.appendChild(createInfoElement(`Highest Salary: $${stats.maxSalary.toFixed(2)} (Employee: ${stats.highestPaidEmployee.fullName()})`, 'p'));
    statsDiv.appendChild(createInfoElement(`Average Age: ${stats.averageAge.toFixed(1)} years`, 'p'));
    statsDiv.appendChild(createInfoElement(`Oldest Employee: ${stats.oldestEmployee.fullName()} (${stats.maxAge} years)`, 'p'));
    statsDiv.appendChild(createInfoElement(`Youngest Employee: ${stats.youngestEmployee.fullName()} (${stats.minAge} years)`, 'p'));
}


// Инициализация пустой статистики при загрузке страницы
renderStats();
// Инициализация пустого списка сотрудников при загрузке страницы
renderEmployeeList();


