class person{
    constructor(fullname, email, contactNum){
        this.fullname = fullname;
        this.email = email,
        this.contactNum = contactNum
    }
    display(){
        console.log(`Heyy! I'm a person. My name is ${this.fullname} and my email is ${this.email} and my contact number is ${this.contactNum}`);
    }
}

class trainee extends person{
    constructor(fullname, email, contactNum, highestQualification, college, university, passoutYear){
        super(fullname, email, contactNum);
        this.highestQualification =highestQualification;
        this.college = college;
        this.university = university;
        this.passoutYear = passoutYear;
    }
    display(){
        // super.display();
        console.log(`Heyy! I'm a trainee. My name is ${this.fullname} and my email is ${this.email} and my contact number is ${this.contactNum}`);
        console.log(`My heighest qualification is ${this.highestQualification}.`);
        console.log(`My college name is ${this.college}.`);
        console.log(`My university name is ${this.university}.`);
        console.log(`My passout year is ${this.passoutYear}.`);
    }
}

let trainee1 = new trainee("Manish Rathod", "manish.rathod769@bacancy.com", 7283848276, "BE - CE", "VGEC", "GTU", 2022);
trainee1.display()