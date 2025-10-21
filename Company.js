class Company {
    constructor() {
        this._employees = [];
    }

    get employees() {
        return [...this._employees];
    }

    addEmployee(employee) {
        if (this._employees.findIndex(e => e.id === employee.id) === -1) {
            this._employees.push(employee);
            return true;
        }
        return false;
    }

    removeEmployee(id) {
        const index = this._employees.findIndex(e => e.id === id);
        if (index >= 0) {
            this._employees.splice(index, 1);
        }
        return index >= 0;
    }

    get size() {
        return this._employees.length;
    }

    get stats() {
        const employees = this._employees;
        if (employees.length === 0) {
            return null;
        }

        const statsData = employees.reduce((acc, employee) => {
            // зарплата
            acc.totalSalary += employee.salary;
            if (employee.salary > acc.maxSalary) {
                acc.maxSalary = employee.salary;
                acc.highestPaidEmployee = employee;
            }

            // возраст
            acc.totalAge += employee.age;
            if (employee.age > acc.maxAge) {
                acc.maxAge = employee.age;
                acc.oldestEmployee = employee;
            }
            if (employee.age < acc.minAge) {
                acc.minAge = employee.age;
                acc.youngestEmployee = employee;
            }
            return acc;
        }, {
            totalSalary: 0,
            maxSalary: -Infinity,
            highestPaidEmployee: null,
            totalAge: 0,
            maxAge: -Infinity,
            minAge: Infinity,
            oldestEmployee: null,
            youngestEmployee: null
        });

        // Расчет средних значений
        const totalEmployees = employees.length;
        statsData.averageSalary = statsData.totalSalary / totalEmployees;
        statsData.averageAge = statsData.totalAge / totalEmployees;
        statsData.totalEmployees = totalEmployees;

        return statsData; // Возвращаем полный объект со всей статистикой
    }
}
