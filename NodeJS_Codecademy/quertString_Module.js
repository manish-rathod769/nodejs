const url = 'https://www.example.com/p/a/t/h?course=node&lesson=http';

const querystring = require('querystring');

const queryToParse = url.split("?")[1];

const parsedQuery = querystring.parse(queryToParse);

parsedQuery.exercise = 'querystring';

const modifiedQueryString = querystring.encode(parsedQuery);