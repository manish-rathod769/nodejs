const { v4: uuidv4 } = require('uuid');
const multipart = require('aws-lambda-multipart-parser');
const { AWS } = require('../config/aws.config');

const s3 = new AWS.S3();
const { successResponse, errorResponse } = require('../helper/responses.helper');
const { userProfilePath, generateObjectURL } = require('../constants/links.constant');

exports.uploadS3 = async (event, context) => {
  try {
    // Parse data from event.body
    const eventBody = multipart.parse(event, true);
    const bufferImg = eventBody.avatar.content;
    const validExt = ['jpg', 'jpeg', 'png', 'svg'];

    // Check if user's have selected only allowed files
    if (typeof eventBody.avatar !== 'object' || !eventBody.avatar.contentType || !validExt.includes(eventBody.avatar.contentType.split('/')[1])) {
      context.end();
      return errorResponse('Invalid image format', 406);
    }
    const fileExt = eventBody.avatar.contentType.split('/')[1];

    const userId = uuidv4();
    const fileName = `${userId}.${fileExt}`;

    // Upload file on S3 bucket
    await s3.putObject({
      Body: bufferImg,
      Key: `${userProfilePath}/${fileName}`,
      ContentType: fileExt,
      Bucket: process.env.AWS_BUCKET_NAME,
      ACL: 'public-read',
    }).promise();

    // Send response to next middleware
    return successResponse({ userId, message: 'File uploaded successfully...', objURL: generateObjectURL(fileName) }, 200);
  } catch (error) {
    context.end();
    return errorResponse(error.message, 500);
  }
};
