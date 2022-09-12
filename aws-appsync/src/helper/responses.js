module.exports.successResponse = (data, code) => ({
  statusCode: code || 200,
  body: data,
});
