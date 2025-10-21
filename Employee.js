class Person {
    constructor(id, firstName, lastName, birthDate) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        // Важно: в конструкторе преобразуем строку в объект Date
        this._birthDate = new Date(birthDate);
    }

    get id() {
        return this._id;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    get birthDate() {
        return this._birthDate;
    }

    set lastName(value) {
        this._lastName = value;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get age() {
        // --- ИСПРАВЛЕННЫЙ, ТОЧНЫЙ РАСЧЕТ ВОЗРАСТА ---
        const today = new Date();
        const birthDate = this._birthDate;

        let age = today.getFullYear() - birthDate.getFullYear();

        // Корректировка, если день рождения в этом году еще не наступил
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
        // ----------------------------------------------
    }
}

class Employee extends Person {
    constructor(id, firstName, lastName, birthDate, salary) {
        super(id, firstName, lastName, birthDate);
        this._salary = salary;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        if (value > this._salary) {
            this._salary = value;
        }
    }

    // --- Добавлен toHTML() для ООП-отображения ---
    toHTML() {
        return `
        ID: ${this.id},
        Name: ${this.fullName()},
        Age: ${this.age},
        Salary: $${this.salary.toFixed(2)}
        `;
    }
    // ----------------------------------------------
}