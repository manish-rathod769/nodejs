const patients = [
    {
        "name": "James",
        "ailments": ["Cough", "Cold", "Fever"]
    },
    {
        "name": "George",
        "ailments": ["Blood Pressure"]
    },
    {
        "name": "Robert",
        "ailments": ["Cough", "Cold", "Fever"]
    },
    {
        "name": "Mary",
        "ailments": ["Diabetes"]
    },
    {
        "name": "Patricia",
        "ailments": ["Blood Pressure"]
    }
];

const patientsToBeAppend = [
    {
        "name": "Christopher",
        "ailments": ["Dengue"]
    },
    {
        "name": "Thomas",
        "ailments": ["Diabetes"]
    },
    {
        "name": "Anthony",
        "ailments": ["Fatigue", "Cold", "Fever"]
    }
];

// Appending patientsToBeAppend array in to patients array.
patients.push(...patientsToBeAppend);

// Deleting the patient having the name "George" from the new array.
const index = patients.findIndex( ele => {
    return ele.name === "George";
})
patients.splice(index, 1);

// Adding one patients at the beginning of the array.
const pat1 = {
    "name": "Patient1",
    "ailments": ["Fever", "Cold", "Cough"]
}
patients.unshift(pat1);

// Deleting one patients from the end of array.
patients.pop();

// Deleting one patients from the beginning of the array.
patients.shift();

// Inserting one patient somewhere within the array at index 4.
const pat2 = {
    "name": "Patient2",
    "ailments": ["Fever", "Blood Pressure"]
}
patients.splice(4, 0, pat2)

// Using the find method, find the patients having Diabetes.
let diabetesPatients = []
let patientsHavingDiabetes = patients.find( (value) => {
    if((value.ailments).includes("Diabetes")){
        diabetesPatients.push(value.name)
    }
})
console.log("Following patients having diabetes : ", ...diabetesPatients)

// Reversing the order of all the array objects.
patients.reverse()