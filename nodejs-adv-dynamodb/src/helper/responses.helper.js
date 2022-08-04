module.exports.successResponse = (data, code) => ({
  statusCode: code || 200,
  body: JSON.stringify(
    {
      success: true,
      data,
    },
    null,
    5,
  ),
});

module.exports.errorResponse = (data, code) => ({
  statusCode: code || 500,
  body: JSON.stringify(
    {
      success: false,
      data: {
        message: data,
      },
    },
    null,
    5,
  ),
});
