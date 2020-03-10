'use strict';

module.exports.list = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'LIST!',
    }),
  };

  callback(null, response);
};