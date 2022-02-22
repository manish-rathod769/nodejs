let alwaysThrows = () => {
    throw new Error('OH NOES');
}

let iterate = firNum => {
    console.log(firNum);
    return firNum+=1;
}

Promise.resolve(iterate(1)).then(iterate).then(iterate).then(iterate).then(iterate).then(alwaysThrows).then(iterate).then(iterate).then(iterate).then(iterate).then(iterate).then(null, (err) =>  console.log(err.message));