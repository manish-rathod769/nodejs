const http = require('http');
const fs = require('fs');

let readData = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if(err) return reject(new Error(err));
            resolve(data);
        })
    })
}

const server = http.createServer( async (req, res) => {
    if(req.method === 'GET'){
        const url = new URL(req.url, "http://localhost:3010");
        let id = url.searchParams.get("id");
        if(typeof id === 'object'){
            readData("./jobs.json").then(data => console.log(JSON.parse(data))).catch(err => console.error(err));
            console.log("All Data Fetched Successfully...");
            res.end();
        }else{
            id = parseInt(id);
            readData("./jobs.json")
            .then(data => {
                let idArr = [];
                data = JSON.parse(data);
                data.forEach(job => {
                    idArr.push(job.ID);
                })
                if(idArr.includes(id)){
                    console.log("Data fetched successfully...");
                    data.forEach( jobObj => {
                        if(jobObj.ID === id){
                            console.log(jobObj);
                        }
                    });
                    res.end();
                }else{
                    console.log("Data does not exist...");
                    res.end();
                }
            })
            .catch(err => console.error(err));
        }
    }else if(req.method === 'POST'){
        let dataToBeAdded = "";
        req.on('data', chunk => {
            dataToBeAdded += chunk;
        });
        req.on('end', () => {
            dataToBeAdded = JSON.parse(dataToBeAdded);
            dataToBeAdded.ID = getUserID();
            readData("./jobs.json")
            .then( data => {
                data = JSON.parse(data);
                data.push(dataToBeAdded);
                writeToFile("./jobs.json", data)
                .then( (data) => {
                    console.log("Data added successfully...")
                    res.end();
                })
                .catch( (err) => console.error(err));
            }).catch(err => console.error(err));
        });
    }
});

server.listen(3010, console.log("Server running on http://localhost:3010"));