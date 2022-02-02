const daysArr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const newDaysArr = daysArr.map( day => {
    return day.charAt(0).toUpperCase() + day.substring(1);
})

console.log(newDaysArr)