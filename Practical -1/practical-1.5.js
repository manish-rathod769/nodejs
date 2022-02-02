const str = "Write a function that takes a string as an argument and returns the number of words in it.";

let totalWord = (string) => {
    return string.split(" ").length;
}

console.log(totalWord(str));