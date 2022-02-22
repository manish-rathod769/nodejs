const promise = new Promise( (resolve, reject) => {
    resolve("I FIRED");
    reject(new Error('I DID NOT FIRE'));
});

let onReject = err => {
    console.error(err.message);
}

promise.then( mess => console.log(mess), onReject );