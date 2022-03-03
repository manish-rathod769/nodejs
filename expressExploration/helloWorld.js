const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send("Hello World!");
}).listen(3000, () => console.log(`Server running on http://localhost:3000`));