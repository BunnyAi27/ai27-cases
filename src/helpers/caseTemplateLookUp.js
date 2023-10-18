const { DynamoDBDocument, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const dynamoDBClient = new DynamoDB();
const ddb = DynamoDBDocument.from(dynamoDBClient);
const responseBuilder = require("./responseBuilder");

const getTemplateInfo = async (templateName) => {
  try {
    const input = {
      TableName: process.env.CASES_TEMPLATE_LOOK_UP,
      Key: {
        templateName: templateName,
      },
    };
    const command = new GetCommand(input);
    const response = await ddb.send(command);
    console.info("Template lookup response: ", response);
    return response;
  } catch (error) {
    console.error("Template lookup error: ", error);
    return responseBuilder.formatResponse(templateName, 400, error);
  }
};

module.exports = {
    getTemplateInfo,
};
