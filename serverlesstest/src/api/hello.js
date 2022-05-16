module.exports.handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      context,
      message: 'This is hello.js file'
    })
  }
}
