let errorCount = 0;
let selectedTech = [];

const regExpForName = /^[A-Za-z\p{L}]+[\s]{0,1}[-A-Za-z\p{L}]*['\-]{0,1}[-A-Za-z\p{L}]+$/;
const regExpForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

let validtaeNameOrEmailField = (id, errId, regExp) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.match(regExp), errId);
}

let validateContactNumberField = (id, errId) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.length == 10 && fieldText > 0, errId);
}

let validateAddressField = (id, errId) => {
    let fieldText = $(id).val();

    checkCondition(fieldText.length > 0, errId);
}

let validatePinCode = (id, errID) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.length == 6 && fieldText > 0, errID)
}

let unclicked = (id) => {
    document.getElementById(id).disabled = true; document.getElementById(id).setAttribute("placeholder", ""); document.getElementById(id).value = "";
}

let validateTechnologyKnownField = (errId) => {
    let fieldText = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach( (tech) => {
        fieldText.push(tech.value);
    });
    selectedTech = fieldText;
    // console.log(selectedTech);
    checkCondition(fieldText.length > 0, errId);
    (!fieldText.length > 0) ? hideShowTechError("none") : hideShowTechError("block");
    if(fieldText.length > 0){
        ['NodeJs', 'ReactJs', 'VueJs', 'ROR', 'ReactNative', 'Flutter'].forEach( (tech) => {
            if(fieldText.includes(tech)){
                document.getElementById(tech + "ExpError").style.opacity = 1; document.getElementById(tech + "Exp").disabled = false; document.getElementById(tech + "Exp").setAttribute("placeholder", `${tech} Experience`);
            }else{
                document.getElementById(tech + "ExpError").style.opacity = 0; unclicked(tech + "Exp");
            }
        });
    }else{
        hideShowTechError("none");
    }
}

let validateTechExpYear = (id, errID) => {
    let fieldText = $(id).val();
    checkCondition(fieldText.length > 0 && fieldText >0, errID);
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

let hideShowTechError = displayProp => {
    document.getElementById("NodeJsExpError").style.display = displayProp; document.getElementById("ReactJsExpError").style.display = displayProp; document.getElementById("VueJsExpError").style.display = displayProp;
    document.getElementById("RORExpError").style.display = displayProp; document.getElementById("ReactNativeExpError").style.display = displayProp; document.getElementById("FlutterExpError").style.display = displayProp;
    if(displayProp === "none"){
        unclicked("NodeJsExp"); unclicked("ReactJsExp"); unclicked("VueJsExp"); unclicked("RORExp"); unclicked("ReactNativeExp"); unclicked("FlutterExp");
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
    validateCareerStartDate("#careerstartdate", "careerstartdateError");
    validateTechnologyKnownField("techKnownError");
    if(selectedTech.length > 0){
        selectedTech.forEach( tech => {
            validateTechExpYear(`#${tech}Exp`, `${tech}ExpError`);
        });
    }
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
        });
        
        (isDataPresent()) ? userDataObj.id = checkForID() : userDataObj.id = 1;
        userDataObj.tech = techKnown;
        delete userDataObj.techKnown;
        console.log(userDataObj);
        if(isDataPresent()) {
            let dataInObj = JSON.parse(localStorage.getItem("usersDataInStr"));
            dataInObj.push(userDataObj);
            localStorage.setItem("usersDataInStr", JSON.stringify(dataInObj));
        }else {
            let dataInObj = [];
            dataInObj.push(userDataObj);
            localStorage.setItem("usersDataInStr", JSON.stringify(dataInObj));
        }
        alert("Data inserted successfully...");
        window.location.reload();
    }else{
        alert("Please Enter Valid Inputs  !!!");
        hideShowTechError("none");
    }
}

let isDataPresent = () => {
    let data = localStorage.getItem("usersDataInStr");
    return (data) ? true : false;  
}

let checkForID = ()=> {
    let users = JSON.parse(localStorage.getItem("usersDataInStr"));
    let ids = [];
    users.forEach( (obj) => {
        ids.push(obj.id);
    });
    for(let i=1; ; i++){
        if(!ids.includes(i)){
            return i;
        }
    }
}

let deleteUser = id => {
    let uid = id.substring(4);
    let userdInObj = JSON.parse(localStorage.getItem("usersDataInStr"));
    if(userdInObj.length == 1){
        localStorage.removeItem("usersDataInStr");
    }else{
        let usersAfterDelete = [];
        userdInObj.forEach( obj => {
            if(obj.id != uid){
                usersAfterDelete.push(obj);
            }
        });
        localStorage.setItem("usersDataInStr", JSON.stringify(usersAfterDelete));
    }
    alert("Data deleted successfully !!!");
    window.location.reload();
}

let LoadData = () => {
    const mytable = document.getElementById("employee-data");
    let users = JSON.parse(localStorage.getItem("usersDataInStr"));
    users.forEach( (obj) => {
        let newRow = document.createElement("tr");
        let cell1 = document.createElement("td"); cell1.innerText = obj.id; newRow.appendChild(cell1);
        let cell2 = document.createElement("td"); cell2.innerText = `${obj.title} ${obj.fname} ${obj.mname} ${obj.lname}`; newRow.appendChild(cell2);
        let cell3 = document.createElement("td"); cell3.innerText = `${obj.gender}`; newRow.appendChild(cell3);
        let cell4 = document.createElement("td"); cell4.innerText = obj.emailID; newRow.appendChild(cell4);
        let cell5 = document.createElement("td"); cell5.innerText = obj.contactNum; newRow.appendChild(cell5);
        let cell6 = document.createElement("td"); cell6.innerText = `${obj.houseNum}, ${obj.addressLine}, ${obj.landmark}, ${obj.city}, ${obj.state}, ${obj.country} - ${obj.pincode}`; newRow.appendChild(cell6);
        let cell7 = document.createElement("td"); cell7.innerText = obj.designation; newRow.appendChild(cell7);
        let cell8 = document.createElement("td");

        let tech_Exp = "";
        obj.tech.forEach( tech => {
            let exp = `${tech}Exp`;
            tech_Exp += `${tech} - ${obj[exp]}\n`;
        });
        cell8.innerText = tech_Exp; newRow.appendChild(cell8);
        let cell9 = document.createElement("td"); cell9.innerText = obj.experience; newRow.appendChild(cell9);
        
        let btnCell = document.createElement("td");
        let btn = document.createElement("button");
        btn.innerText = "delete";
        btn.value = obj.id;
        btn.classList.add("btn", "btn-danger", "btn-sm");
        btn.setAttribute("onclick",`deleteUser('#del${obj.id}')`);
        btnCell.appendChild(btn);
        newRow.appendChild(btnCell);
        mytable.appendChild(newRow);
    });
}

(isDataPresent()) ? LoadData() : alert("Data does not exist !!!");
hideShowTechError("none");