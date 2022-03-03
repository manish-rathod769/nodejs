const express = require('express');
const app = express();

const port = 3000;

let customMiddleWare = (req, res, next) => {
    console.log("This is a custom middleware.");
    next();
}

app.get("/", customMiddleWare, (req, res) => {
    res.send("Out of custom middleware.");
});
app.listen(port, () => console.log(`Server running on http://localhost:3000`));