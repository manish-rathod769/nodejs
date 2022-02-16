const url = require('url');

const URL_TO_PARSE = new URL('https://www.example.com/p/a/t/h?query=string');

const myUrl = new URL(URL_TO_PARSE);

const hostname = myUrl.hostname;
const pathname = myUrl.pathname;
const searchParams = myUrl.searchParams;
console.log(hostname, pathname, searchParams);