// var kelvin contains temperature in kelvin
var kelvin = 0;

// var celsius contains temperature in celsius 
var celsius = kelvin - 273;

// var fahrenheit containes temperature in fahrenheit
var fahrenheit = celsius * (9/5) + 32;

// This line will floor the value of fahrenheit variable.
fahrenheit = Math.floor(fahrenheit);

// Console the value of fahrenheit.
console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);