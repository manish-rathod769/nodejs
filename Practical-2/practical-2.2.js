class Employee{
    static organizationName = "";
    #employeeID = "";
    #department = "";
    #designation = ""
    #technologiesKnown = "";
    #dateOfJoining = "";
    #experience = ""

    set empData(params){
        this.#employeeID = params.empID;
        this.#department = params.department;
        this.#designation = params.designation;
        this.#technologiesKnown = params.technologiesKnown;
        this.#dateOfJoining = params.dateOfJoining;
        this.#experience = params.experience;
    }

    get empData(){
        return `Id: ${this.#employeeID}\nDepartment: ${this.#department}\nDesignation: ${this.#designation}\nTech: ${this.#technologiesKnown}\nDOJ: ${this.#dateOfJoining}\nExperience: ${this.#experience}`
    }
}


let emp = new Employee();
emp.empData = {
    empID: 123,
    department: "Trainee",
    designation: "NodeJs Trainee",
    technologiesKnown: "HTML, CSS, JS",
    dateOfJoining: "3rd Jan, 2022",
    experience: "0-1"
};
console.log(`Organization Name: ${Employee.organizationName}`);
console.log(emp.empData);