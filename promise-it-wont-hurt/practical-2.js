const promise = new Promise( (resolved, rejected) => {
    setTimeout(() => {
        resolved('FULFILLED!');
    }, 300);
});

promise.then( mess => {
    console.log(mess);
});