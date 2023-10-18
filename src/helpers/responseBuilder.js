const formatResponse = (event, code, response) => {
  const formattedResponse = {
    statusCode: code,
    body: JSON.stringify(response),
  };
  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Origin": "*",
  };
  formattedResponse.headers = headers;
  console.log(JSON.stringify(formattedResponse));
  return formattedResponse;
};

module.exports = {
  formatResponse,
};
