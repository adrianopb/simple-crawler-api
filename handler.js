'use strict';

module.exports.hello = async event => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Go Serverless v1.0! Your function executed successfully!'
        },
        null,
        2
      )
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'An unexpected error has occurred. Please try again later.'
        },
        null,
        2
      )
    }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};