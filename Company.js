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
}