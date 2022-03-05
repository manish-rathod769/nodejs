const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.format({
    root: "/",
    dir: __dirname,
    base: "jobs.json"
});

let readData = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if(err) return reject(new Error(err));
            resolve(data);
        })
    })
}

let getUserID = () => {
    let count; let idArr =[];
    let userDataInObj = JSON.parse(fs.readFileSync(filePath, 'utf-8', err => {
        if(err) console.error(err);
    }));
    userDataInObj.forEach(( obj => {
        idArr.push(obj.ID);
    }));
    for(let i=1; ;i++){
        if(!idArr.includes(i)){
            count = i;
            return count;
        }
    }
}

let writeToFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

const server = http.createServer( async (req, res) => {
  const url = new URL(req.url, "http://localhost:3010");
  // console.log(typeof req.url);
  const api = req.url.split("?")[0];
    if(req.method === 'GET'){
      let id = url.searchParams.get("id");
        if(typeof id === 'object' && api === '/api/fetchAll'){
            readData(filePath)
            .then(data => {
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(data);
            })
            .catch(err =>{
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end(err.message);
            });
            // console.log("All Data Fetched Successfully...");
        }else if(typeof id != 'object' && api === '/api/fetchOne'){
            id = parseInt(id);
            readData(filePath)
            .then(data => {
                let idArr = [];
                data = JSON.parse(data);
                data.forEach(job => {
                    idArr.push(job.ID);
                })
                if(idArr.includes(id)){
                    // console.log("Data fetched successfully...");
                    data.forEach( jobObj => {
                        if(jobObj.ID === id){
                            // console.log(jobObj);
                            res.writeHead(200, "success", { 'content-type': 'application/json' });
                            res.end(JSON.stringify(jobObj));
                        }
                    });
                }else{
                    res.writeHead(404, { 'content-type': 'text/plain' });
                    res.end("Data does not exist...");
                }
            })
            .catch(err => {
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end(err.message);
            });
        }else{
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end("Api or requested method type does not match!!!");
        }
    }else if(req.method === 'POST' && api === '/api/addUser'){
        let dataToBeAdded = "";
        req.on('data', chunk => {
            dataToBeAdded += chunk;
        });
        req.on('end', () => {
            dataToBeAdded = JSON.parse(dataToBeAdded);
            dataToBeAdded.ID = getUserID();
            readData(filePath)
            .then( data => {
                data = JSON.parse(data);
                data.push(dataToBeAdded);
                writeToFile(filePath, data)
                .then( (data) => {
                    // console.log("Data added successfully...");
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(dataToBeAdded));
                })
                .catch( (err) => { 
                    res.writeHead(415, { 'content-type': 'text/plain' });
                    res.end(err.message);
                });
            }).catch(err => {
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end(err.message);
            });
        });
    }else if(req.method == "PUT" && api === '/api/updateUser'){
        const id = parseInt(url.searchParams.get("id"));
        readData(filePath)
        .then( data => {
            let idArr = [];
            data = JSON.parse(data.toString());
            data.forEach( obj => {
                idArr.push(obj.ID);
            });
            if(idArr.includes(id)){
                let dataToBeUpdate = "";
                req.on('data', chunk => {
                    dataToBeUpdate += chunk;
                });
                req.on('end', () =>{
                    dataToBeUpdate = JSON.parse(dataToBeUpdate);
                    // console.log(dataToBeUpdate);
                    data.forEach( jobObj => {
                        if(jobObj.ID === id) {
                            for( const [key, value] of Object.entries(dataToBeUpdate)){
                                if(typeof value === 'string'){
                                    jobObj[key] = value;
                                }else{
                                    for( const [key2, value2] of Object.entries(value)){
                                        jobObj[key][key2] = value2;
                                    }
                                }
                            }
                        }
                    });
                    writeToFile(filePath, data)
                    .then( (data) => {
                        console.log("Data Updated successfully...");
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.end("Data Updated successfully...");
                    })
                    .catch( (err) => {
                        res.writeHead(415, { 'content-type': 'text/plain' });
                        res.end(err.message);
                    });
                });
            }else{
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end("Data does not exist !!!");
            }
        })
        .catch( (err) => {
            res.writeHead(404, { 'content-type': 'text/plain' });
            res.end(err.message);
        });
    }else if(req.method === "DELETE" && api === '/api/deleteUser'){
        const id = parseInt(url.searchParams.get("id"));
        readData(filePath)
        .then( data => {
            let idArr = [];
            data = JSON.parse(data.toString());
            data.forEach( obj => {
                idArr.push(obj.ID);
            });
            if(idArr.includes(id)){
                readData(filePath).then( data => {
                    let dataToReplace = [];
                    data = JSON.parse(data);
                    data.forEach( obj => {
                        if(obj.ID != id){
                            dataToReplace.push(obj);
                        }
                    });
                    writeToFile(filePath, dataToReplace)
                    .then( (data) => {
                        // console.log("Data Deleted successfully...");
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.end("Data deleted successfully....");
                    })
                    .catch( (err) => {
                        res.writeHead(415, { 'content-type': 'text/plain' });
                        res.end(err.message);
                    });
                })
                .catch(err => console.error(err));
            }else{
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end("Data does not exist !!!");
            }
        })
        .catch( (err) => {
            res.writeHead(404, { 'content-type': 'text/plain' });
            res.end(err.message);
        });
    }else{
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end("Api or requested method type does not match!!!");
    }
});

server.listen(3010, console.log("Server running on http://localhost:3010"));