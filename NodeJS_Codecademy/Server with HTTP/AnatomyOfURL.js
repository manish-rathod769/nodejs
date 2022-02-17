let urlExp = "protocol/domain/path/"

let userID = 25;
urlExp += userID;

let query = "type=personal&month=january";
urlExp = urlExp + "?" + query;

console.log(urlExp);