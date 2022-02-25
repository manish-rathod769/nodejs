const fs = require("fs");

module.exports = async (filePath) => {
    try{
        return await fs.promises.readFile(filePath, "utf-8");
    }catch(err){
        console.error(new Error(err));
    }
}