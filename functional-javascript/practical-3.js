function doubleAll(numbers) {
    var result = []
    result = numbers.map( n => {
        return n*2;
    });
    return result
}
  
module.exports = doubleAll