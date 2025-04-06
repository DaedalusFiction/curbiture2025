// netlify/functions/askClaude.js

exports.handler = async function (event, context) {
  let message = "";

  try {
    return {
      statusCode: 200,
      body: message,
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: "An unknown error occured.",
    };
  }
};
