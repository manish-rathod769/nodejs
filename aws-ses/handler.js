const { AWS } = require('./aws.config');

const ses = new AWS.SES();

module.exports.sendEmail = async (event) => {
  const params = {
    Destination: {
      ToAddresses: ["manishkrathod769@gmail.com"] // Email address addresses that you want to send your email to
    },
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: "UTF-8",
          Data: "<html><body><h2> Go follow <a href=\"https://medium.com/@usamayousuf_62526\"> @usamayousuf_62526 </a> on medium  </h2></body></html>"
        },
        Text: {
          Charset: "UTF-8",
          Data: "FYI"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Email via SES"
      }
    },
    Source: "manishkrathod769@gmail.com",
  };

  const result = await ses.sendEmail(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Email sent successfully...',
        result,
      },
      null,
      2
    ),
  };
};
