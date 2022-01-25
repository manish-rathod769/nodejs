// *****  Function Declarations  *****

    function getReminder(){
        console.log('Water the plants.');
    }
  
    function greetInSpanish(){
        console.log('Buenas Tardes.');
    }

// *****  Calling a Function  *****

    function sayThanks(){
        console.log('Thank you for your purchase! We appreciate your business.');
    }
  
    sayThanks();
    sayThanks();
    sayThanks();

// *****  Parameters and Arguments  *****

    function sayThanks(name) {
        console.log(`Thank you for your purchase ${name}! We appreciate your business.`);
    }
  
    sayThanks('Cole');

// *****  Default Parameters  *****
    function makeShoppingList(item1 = 'milk', item2 = 'bread', item3 = 'eggs'){
        console.log(`Remember to buy ${item1}`);
        console.log(`Remember to buy ${item2}`);
        console.log(`Remember to buy ${item3}`);
    }

// *****  Return  *****

    function monitorCount(rows, columns){
        return rows * columns;
    }
  
    const numOfMonitors = monitorCount(4, 5);
  
    console.log(numOfMonitors);

// *****  Helper Functions  *****

    function monitorCount(rows, columns) {
        return rows * columns;
    }

    function costOfMonitors(rows, columns){
        return monitorCount(rows, columns) * 200;
    }

    const totalCost = costOfMonitors(5, 4);

    console.log(totalCost);

// *****  Function Expressions  *****

    const plantNeedsWater = function(day){
        if(day === 'Wednesday'){
            return true;
        }else{
            return false;
        }
    }

    console.log(plantNeedsWater('Tuesday'));

// *****  Arrow Functions  *****

    const plantNeedsWater = (day)=>{
        if (day === 'Wednesday') {
            return true;
        } else {
            return false;
        }
    };

// *****  Concise Body Arrow Functions  *****

    const plantNeedsWater = day => day === 'Wednesday' ? true : false;