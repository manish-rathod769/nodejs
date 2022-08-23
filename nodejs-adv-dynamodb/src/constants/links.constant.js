const userProfilePath = 'users/profile';
const generateObjectURL = (fileName) => `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${userProfilePath}/${fileName}`;

module.exports = {
  userProfilePath,
  generateObjectURL,
};
