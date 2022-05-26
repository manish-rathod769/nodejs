const fs = require('fs');

exports.readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return new Error(error);
  }
};

// eslint-disable-next-line consistent-return
exports.writeFile = async (filePath, dataToStore) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(dataToStore));
  } catch (error) {
    return new Error(error);
  }
};

// eslint-disable-next-line consistent-return
exports.isEmptyFile = (data) => {
  // Check if data stored in empty/undefined or not
  if (!data || !data.length) {
    return true;
  }
  return false;
};
