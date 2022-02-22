const promise = new Promise( (resolved, rejected) => {
    setTimeout(() => {
        rejected(new Error('REJECTED!'));
    },300);
});

let onReject = error => {
    console.log(error.message);
}

promise.then(null, onReject);