// *****  Functions as Data  *****

    const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
        for(let i = 1; i <= 1000000; i++) {
            if ( (2 + 2) != 4) {
                console.log('Something has gone very wrong :( ');
            }
        }
    }

    let is2p2 = checkThatTwoPlusTwoEqualsFourAMillionTimes;

    is2p2();

    console.log(is2p2.name);

// *****  Functions as Parameters  *****

    const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
        for(let i = 1; i <= 1000000; i++) {
            if ( (2 + 2) != 4) {
                console.log('Something has gone very wrong :( ');
            }
        }
    };

    const addTwo = num => num + 2;

    const timeFuncRuntime = funcParameter => {
        let t1 = Date.now();
        funcParameter();
        let t2 = Date.now();
        return t2 - t1;
    };

    const time2p2 = timeFuncRuntime(checkThatTwoPlusTwoEqualsFourAMillionTimes);
    console.log(time2p2);

    const checkConsistentOutput = (func, val) => {
        let try1 = func(val);
        let try2 = func(val);
        if(try1 === try2){
            return try1;
        }else{
            return 'This function returned inconsistent results'
        }
    }

    console.log(checkConsistentOutput(addTwo, 10))