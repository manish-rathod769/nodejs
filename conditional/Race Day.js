let raceNumber = Math.floor(Math.random() * 1000);

var registeredEarly = true;

var racerAge = 22;

if(racerAge > 18 && registeredEarly){
  raceNumber += 1000;
  console.log(`Your time is 9:30 and race number is: ${raceNumber}`);
}else if(racerAge > 18 && !registeredEarly){
  console.log(`Your time is 11:00 and race number is: ${raceNumber}`);
}else if(racerAge < 18){
  console.log(`Your time is 12:30 and race number is: ${raceNumber}`)
}else{
  console.log('Please see the registration desk.')
}