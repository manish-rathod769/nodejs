let errorCount = 0;
const regExpForName = /^[A-Za-z\p{L}]+[\s]{0,1}[-A-Za-z\p{L}]*['\-]{0,1}[-A-Za-z\p{L}]+$/;
const regExpForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

let validtaeNameOrEmailField = (id, errId, regExp) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.match(regExp), errId);
}

let validateContactNumberField = (id, errId) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.length == 10, errId);
}

let validateAddressField = (id, errId) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.length > 0, errId);
}

let validateTechnologyKnownField = (errId) => {
    let fieldText = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach( (tech) => {
        fieldText.push(tech.value);
    });
    checkCondition(fieldText.length > 0, errId);
}

let validateCareerStartDate = (id, errId) => {
    let fieldText = Date.parse($(id).val());
    let currDate = Date.parse(new Date());
    checkCondition(currDate > fieldText, errId);
    if(currDate > fieldText){
        let carrerStartYear = new Date(fieldText).getFullYear();
        let currYear = new Date(currDate).getFullYear();
        let expYear = currYear - carrerStartYear;
        let month = new Date(currDate).getMonth() - new Date(fieldText).getMonth();
        if (month < 0 || (month === 0 && new Date(currDate).getDate() < new Date(fieldText).getDate())) 
        {
            expYear--;
        }
        document.getElementById("experience").value = expYear;
    }
}


let checkCondition = (cond, errId) => {
    if(cond){
        document.getElementById(errId).style.opacity = 0;
    }else{
        document.getElementById(errId).style.opacity = 1;
        errorCount++;
    }
}

let validateForm = () => {
    let userDataObj = {};
    errorCount = 0;
    validtaeNameOrEmailField("#fname", "fnameError", regExpForName);
    validtaeNameOrEmailField("#mname", "mnameError", regExpForName);
    validtaeNameOrEmailField("#lname", "lnameError", regExpForName);
    validtaeNameOrEmailField("#emailID", "emailIDError", regExpForEmail);
    validateContactNumberField("#contactNum", "contactNumError");
    validateAddressField("#houseNum", "houseNumError");
    validateAddressField("#addressLine", "addresslineError");
    validateAddressField("#landmark", "landmarkError");
    validateAddressField("#city", "cityError");
    validateTechnologyKnownField("techKnownError");
    validateCareerStartDate("#careerstartdate", "careerstartdateError");
    validateAddressField("#designation", "designationError");
    if(errorCount == 0){
        document.getElementById("country").disabled = false;  document.getElementById("experience").disabled = false;
        let userData = $("#save-user-from").serializeArray(), techKnown = [];
        document.getElementById("country").disabled = true;  document.getElementById("experience").disabled = true;
        document.querySelectorAll("input[type='checkbox']:checked").forEach( obj => {
            techKnown.push(obj.value);
        });
        userData.forEach( (obj) => {
            userDataObj[obj.name] = obj.value;
        })
        console.log(userDataObj);
        delete userDataObj.techKnown;
    }else{
        alert("Please Enter Valid Inputs  !!!");
    }
}

// Fetch data and save data