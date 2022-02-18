// *****  The .forEach() Method  *****

    const fruits = ['mango', 'papaya', 'pineapple', 'apple'];

    fruits.forEach( f => { 
        console.log(`I want to eat a ${f}`) 
    });

// *****  The .map() Method  *****

    const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

    const secretMessage = animals.map( animal => { 
            return animal[0]; 
    });

    console.log(secretMessage.join(''));

    const bigNumbers = [100, 200, 300, 400, 500];

    const smallNumbers = bigNumbers.map( num => { 
        return num/100;
    });

    console.log(smallNumbers);

// *****  The .filter() Method  *****

    const randomNumbers = [375, 200, 3.14, 7, 13, 852];

    const smallNumbers = randomNumbers.filter( num => { 
        return num < 250;
    });
    console.log(smallNumbers)

    const favoriteWords = ['nostalgia', 'hyperbole', 'fervent', 'esoteric', 'serene'];

    const longFavoriteWords = favoriteWords.filter( word => { 
        return word.length > 7;
    });
    console.log(longFavoriteWords);

// ***** The .findIndex() Method  *****

    const animals = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];

    const foundAnimal = animals.findIndex( animal => { 
        return animal === 'elephant';
    })
    console.log(foundAnimal)

    const startsWithS = animals.findIndex( animal => {
        return animal[0] === 's';
    })
    console.log(startsWithS);

// *****  The .reduce() Method  *****

    const newNumbers = [1, 3, 5, 7];

    const newSum = newNumbers.reduce( (accumulator, currentValue) => {
        console.log('The value of accumulator: ', accumulator);
        console.log('The value of currentValue: ', currentValue);
        return accumulator + currentValue;
    }, 10);

    console.log(newSum);

// *****  Iterator Documentation  *****

    const words = ['unique', 'uncanny', 'pique', 'oxymoron', 'guise'];
    
    console.log(words.some( (word) => {
        return word.length < 10;
    }));
    
    // Use filter to create a new array
    const interestingWords = words.filter( word => {
        return word.length > 5
    });
    console.log(interestingWords)
    
    console.log(interestingWords.every( (word) => { 
        return  word.length > 5 
    }));

// *****  Choose the Right Iterator  *****

    const cities = ['Orlando', 'Dubai', 'Edinburgh', 'Chennai', 'Accra', 'Denver', 'Eskisehir', 'Medellin', 'Yokohama'];

    const nums = [1, 50, 75, 200, 350, 525, 1000];

    //  Choose a method that will return undefined
    cities.forEach( city => console.log('Have you visited ' + city + '?'));

    // Choose a method that will return a new array
    const longCities = cities.filter( city => city.length > 7 );

    // Choose a method that will return a single value
    const word = cities.reduce( (acc, currVal) => {
        return acc + currVal[0];
    }, "C");

    console.log(word)

    // Choose a method that will return a new array
    const smallerNums = nums.map( num => num - 5 );

    // Choose a method that will return a boolean value
    nums.every(num => num < 0);