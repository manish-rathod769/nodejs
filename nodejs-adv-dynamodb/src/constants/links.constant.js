const userProfilePath = 'users/profile';
const generateObjectURL = (fileName) => `https://${process.env.AWS_BUCKET_NAME}.s3-${process.env.REGION}.amazonaws.com/${userProfilePath}/${fileName}`;

module.exports = {
  userProfilePath,
  generateObjectURL,
};
