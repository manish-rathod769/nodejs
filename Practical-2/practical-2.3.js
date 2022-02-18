class Person{
    _fullName = "";
    _email = "";
    _contactNum = "";
    
    constructor(fullName, email, contactNum) {
        this._fullName = fullName;
        this._email = email;
        this._contactNum = contactNum;
    }

    display(){
        console.log(`Name: ${this._fullName}\nEmail ${this._email}\nContact Number: ${this._contactNum}`);
    }
}

class Employee extends Person{
    static organizationName = "Bacancy Technology";
    #employeeID = "";
    #department = "";
    #designation = ""
    #technologiesKnown = "";
    #dateOfJoining = "";
    #experience = "";

    constructor(fullname, email, contactNum, employeeID, department, designation, technologiesKnown, dateOfJoining, experience) {
        super(fullname, email, contactNum);
        this.#employeeID = employeeID;
        this.#department = department;
        this.#designation = designation;
        this.#technologiesKnown = technologiesKnown;
        this.#dateOfJoining = dateOfJoining;
        this.#experience = experience;
    }

    set empData(params){
        this.#employeeID = params.empID;
        this.#department = params.department;
        this.#designation = params.designation;
        this.#technologiesKnown = params.technologiesKnown;
        this.#dateOfJoining = params.dateOfJoining;
        this.#experience = params.experience;
    }

    get empData(){
        return {
            fullname: this._fullName,
            email: this._email,
            contactNum: this._contactNum,
            employeeID: this.#employeeID,
            department: this.#department,
            designation: this.#designation,
            technologiesKnown: this.#technologiesKnown,
            dateOfJoining: this.#dateOfJoining,
            experience: this.#experience,
            display: this.display
        }
    }

    static sortByDOJ(a, b){
        return (a.dateOfJoining - b.dateOfJoining < 0) ? -1 : 1;
    }

    display(){
        console.log(`\nEmployee ID: ${this.employeeID}\nName: ${this.fullname}\nEmail: ${this.email}\nContact Number: ${this.contactNum}\nOrganization name : ${Employee.organizationName}\nDepartment: ${this.department}\nDesignation: ${this.designation}\nTechnology known: ${this.technologiesKnown}\nDate Of Joining: ${this.dateOfJoining}\nExperinece: ${this.experience}\n`);
    }

}

let employeeObjArr = [];

let emp1 = new Employee("Emp 1", "emp.1@bacancy.com", 1234567890, 101, "Trainee", "Back end technology", "NodeJS", new Date(2022, 00, 05), "0-1");
let emp2 = new Employee("Emp 2", "emp.2@bacancy.com", 1234567890, 102, "Trainee", "Back end technology", "NodeJS", new Date(2021, 11, 20), "0-1");
let emp3 = new Employee("Emp 3", "emp.3@bacancy.com", 1234567890, 103, "Trainee", "Back end technology", "NodeJS", new Date(2022, 00, 03), "0-1");
let emp4 = new Employee("Emp 4", "emp.4@bacancy.com", 1234567890, 104, "Trainee", "Back end technology", "NodeJS", new Date(2021, 11, 22), "0-1");
let emp5 = new Employee("Emp 5", "emp.5@bacancy.com", 1234567890, 105, "Trainee", "Back end technology", "NodeJS", new Date(2022, 00, 04), "0-1");

employeeObjArr.push(emp1.empData);
employeeObjArr.push(emp2.empData);
employeeObjArr.push(emp3.empData);
employeeObjArr.push(emp4.empData);
employeeObjArr.push(emp5.empData);

let sortedArr = employeeObjArr.sort(Employee.sortByDOJ);

sortedArr.forEach( obj => {
    obj.display()
})