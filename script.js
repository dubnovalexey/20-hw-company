// TODO Homework: continue develop classes Person, Employee, Company
// Hint: thinking in OOD (Object Oriented Design). NB! Encapsulation
const firm = new Company();
// === 1. ПОЛУЧЕНИЕ ССЫЛОК НА DOM-ЭЛЕМЕНТЫ ===

// Поля ввода (Input)
const inputId = document.getElementById('id');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputBirthDate = document.getElementById('birthdate');
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
    const birthDate = inputBirthDate.value;
    const salary = parseFloat(inputSalary.value);


    // Валидация введенных данных
    if (!id || !firstName || !lastName || isNaN(salary) || salary <= 0 || isNaN(new Date(birthDate).getTime())) {
        alert('All fields must be filled correctly!');
        return;
    }
    // Дополнительная валидация
    if (isNaN(Number(id)) || Number(id) <= 0) {
        alert('ID must be a positive number!');
        return;
    }
    if (!isNaN(Number(firstName)) || !isNaN(Number(lastName))) {
        alert('First Name and Last Name cannot be numbers only!');
        return;
    }
    if (firstName.length < 2 || lastName.length < 2) {
        alert('First Name and Last Name must be at least 2 characters long!');
        return;
    }
    if (firstName.length > 50 || lastName.length > 50) {
        alert('First Name and Last Name must be no more than 50 characters long!');
        return;
    }
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    if (birthDateObj <= new Date('1900-01-01')) {
        alert('Birth Date must be after 01.01.1900!');
        return;
    }
    if (birthDateObj > today) {
        alert('Birth Date cannot be in the future!');
        return;
    }


    // Создаем нового сотрудника
    const newEmployee =
        new Employee(id, firstName, lastName, birthDate, salary);

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
    listEmployeesDiv.innerHTML = ''; // Очистка родителя остается, чтобы избежать дублирования

    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.style.marginBottom = '10px';

        // 1. Используем toHTML() для получения данных
        employeeDiv.innerHTML = employee.toHTML(); // Используем innerHTML только здесь для удобной вставки шаблона

        // 2. Создаем кнопку удаления
        const deleteButton = createButtonDel(() => {
            firm.removeEmployee(employee.id);
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
    // Обрати внимание: мы используем stats.maxSalary и stats.highestPaidEmployee
    statsDiv.appendChild(createInfoElement(`Highest Salary: $${stats.maxSalary.toFixed(2)} (Employee: ${stats.highestPaidEmployee.fullName()})`, 'p'));
    statsDiv.appendChild(createInfoElement(`Average Age: ${stats.averageAge.toFixed(1)} years`, 'p'));
    statsDiv.appendChild(createInfoElement(`Oldest Employee: ${stats.oldestEmployee.fullName()} (${stats.maxAge} years)`, 'p'));
    statsDiv.appendChild(createInfoElement(`Youngest Employee: ${stats.youngestEmployee.fullName()} (${stats.minAge} years)`, 'p'));
}

// Инициализация пустой статистики при загрузке страницы
renderStats();
// Инициализация пустого списка сотрудников при загрузке страницы
renderEmployeeList()


