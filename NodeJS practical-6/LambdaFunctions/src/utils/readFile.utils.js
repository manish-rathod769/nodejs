const fs = require('fs');

exports.readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return new Error(error);
  }
};
