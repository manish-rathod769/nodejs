const http = require('http');
const bl = require('bl');
const urlArr = process.argv.splice(2)
let result = []
let count = 0;

let httpGetReq = (index) => {
    http.get(urlArr[index], (res) => {
        res.pipe(bl( (err, data) => {
            if(err) return console.error(err);
            data = data.toString();
            // console.log(data);
            result[index] = data;
            count++;

            if(count === 3){
                for (let i = 0; i < 3; i++) {
                    console.log(result[i])
                }
            }
        }));
    });
}

for(let i=0; i<3; i++) {
    httpGetReq(i);
}