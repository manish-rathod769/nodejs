let cmdPara = process.argv[2];
let parsePromised = json => {
    return new Promise((resolve, reject) => {
        try{
            resolve(JSON.parse(json));
        }catch(e){
            reject(e.message);
        }
    });
}

let onRejected = err => {
    console.log(err);
}

parsePromised(cmdPara).then(null, onRejected);