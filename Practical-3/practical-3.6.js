const employee = {
    employeeID: 1,
    fullName: "Lav Panchal",
    emailID: "lav.panchal@bacancy.com",
    department: "NodeJS",
    designation: "Software Engineer"
}

const empToString = JSON.stringify(employee);
const copyObject = JSON.parse(empToString);

[copyObject.fullName, copyObject.emailID]= ["Krushit Dudhat", "krushit.dudhat@bacancy.com"];
console.log(employee, copyObject);