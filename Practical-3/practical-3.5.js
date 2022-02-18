const sprinters = [{
        "name": "James",
        "timeToReachFinishLine": 9.10
    },
    {
        "name": "George",
        "timeToReachFinishLine": 9.11
    },
    {
        "name": "Robert",
        "timeToReachFinishLine": 9.25
    },
    {
        "name": "Mary",
        "timeToReachFinishLine": 9.13
    },
    {
        "name": "Patricia",
        "timeToReachFinishLine": 9.14
    },
    {
        "name": "Christopher",
        "timeToReachFinishLine": 10.0
    },
    {
        "name": "Thomas",
        "timeToReachFinishLine": 11.0
    },
    {
        "name": "Anthony",
        "timeToReachFinishLine": 9.0
    },
    {
        "name": "Timothy",
        "timeToReachFinishLine": 19.0
    },
    {
        "name": "Samuel",
        "timeToReachFinishLine": 10.10
    }];

let sortArrByTimeToReachFinishLine = objArr => {
    return objArr.sort( (a, b) => {
        return a.timeToReachFinishLine - b.timeToReachFinishLine;
    });
}

// console.log(sortArrByTimeToReachFinishLine(sprinters));

let findWinners = (objArr) => {
    let winner = objArr[0], firstRunnerUp = objArr[0], secondRunnerUp = objArr[0], justParticipants = [];
    objArr.forEach( obj => {
        if(obj.timeToReachFinishLine > winner.timeToReachFinishLine) {
            secondRunnerUp = firstRunnerUp;
            firstRunnerUp = winner;
            winner = obj;
        }else if(obj.timeToReachFinishLine > firstRunnerUp.timeToReachFinishLine){
            secondRunnerUp = firstRunnerUp;
            firstRunnerUp = obj;
        }
        else if(obj.timeToReachFinishLine > secondRunnerUp.timeToReachFinishLine){
            secondRunnerUp = obj;
        }
    });
    objArr.forEach( obj => {
        (winner === obj || firstRunnerUp === obj || secondRunnerUp === obj) ? "" : justParticipants.push(obj);
    })
    // console.log(winner, '\n', firstRunnerUp, '\n', secondRunnerUp, '\n', justParticipants);
    console.log("Winner : ", winner)
    console.log("\nFirst runner up : ", firstRunnerUp)
    console.log("\nSecond runner up : ", secondRunnerUp);
    console.log("\nJust participants : ", justParticipants);
}

findWinners(sprinters);