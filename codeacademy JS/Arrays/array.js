// *****  Create an Array  *****
    const hobbies = ['playying', 1, true];
    console.log(hobbies);

// *****  Accessing Elements  *****

    const famousSayings = ['Fortune favors the brave.', 'A joke is a very serious thing.', 'Where there is love there is life.'];

    const listItem = famousSayings[0];
    console.log(listItem);

    console.log(famousSayings[0]);
    console.log(famousSayings[4]); // undefined

// *****  Update Elements  *****

    let groceryList = ['bread', 'tomatoes', 'milk'];

    groceryList[1] = 'avocados';

// *****  Arrays with let and const  *****

    let condiments = ['Ketchup', 'Mustard', 'Soy Sauce', 'Sriracha'];

    const utensils = ['Fork', 'Knife', 'Chopsticks', 'Spork'];

    condiments[0] = 'Mayo';
    console.log(condiments);

    condiments = ['Mayo'];
    console.log(condiments);

    utensils[3] = 'Spoon';
    console.log(utensils[utensils.length - 1]);

// ***** The .length property  *****

    const objectives = ['Learn a new languages', 'Read 52 books', 'Run a marathon'];

    console.log(objectives.length);

// *****  The .push() Method  *****

    const chores = ['wash dishes', 'do laundry', 'take out trash'];

    chores.push('Manish', 'Rathod');

    console.log(chores);

// *****  The .pop() Method  *****

    const chores = ['wash dishes', 'do laundry', 'take out trash', 'cook dinner', 'mop floor'];

    chores.pop();
    console.log(chores);

// *****  More Array Methods  *****

    const groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

    groceryList.shift();

    groceryList.unshift('popcorn');
    console.log(groceryList);

    console.log(groceryList.slice(1,4));

    console.log(groceryList);

    const pastaIndex = groceryList.indexOf('pasta');
    console.log(pastaIndex);

// *****  Arrays and Functions  *****

    const concept = ['arrays', 'can', 'be', 'mutated'];

    function changeArr(arr){
        arr[3] = 'MUTATED';
    }

    changeArr(concept);
    console.log(concept);

    function removeElement(newArr){
        newArr.pop();
    }

    removeElement(concept);
    console.log(concept);

// *****  Nested Arrays  *****

    var numberClusters = [[1, 2], [3, 4], [5, 6]];

    const target = numberClusters[2][1];
    console.log(target);