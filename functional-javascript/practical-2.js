function repeat(operation, num) {
    for(let i=1; i<=num; i++) {
        operation();
    }
}

function greetings(){
    console.log("Hello!")
}

repeat(greetings, 5);

module.exports = repeat