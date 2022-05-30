// exports.successResponse = (req, res, data, code = 200) => res.send({
//   code,
//   data,
//   success: true,
// });

exports.successResponse = (data, code = 200) => ({
  statusCode: code,
  body: JSON.stringify({ data }),
});

exports.errorResponse = (errorMessage, code) => ({
  statusCode: code,
  body: JSON.stringify({ error: errorMessage }),
});
