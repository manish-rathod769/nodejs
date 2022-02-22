var promise = Promise.resolve("PROMISE RESOLVED.");
promise.then(console.log);

var promise = Promise.reject(new Error("PROMISE REJECTED!"));
promise.catch(console.log);