var loremIpsum = {
    "name": "lorem-ipsum",
    "version": "0.1.1",
    "dependencies": {
      "optimist": {
        "version": "0.3.7",
        "dependencies": {
          "wordwrap": {
            "version": "0.0.2"
          }
        }
      },
      "inflection": {
        "version": "1.2.6",
        "version": "1.2.8"
      }
    }
  }


function getDependencies(object, stack, rslt){
    let result = rslt || [];
    for(let prop in object){
        if(object.hasOwnProperty(prop)){
            if(typeof object[prop] === "object"){
                getDependencies(object[prop], prop, result);
            }else{
                if(stack != "" && stack != undefined){
                    let value = stack+"@"+object[prop];
                    // console.log(value);
                    (!result.includes(value)) ? result.push(value): console.log("Already Containes.");
                }
            }
        }
    }
    return result.sort();
}

console.log(getDependencies(loremIpsum, ""))

module.exports = getDependencies