const { ConnectCasesClient, CreateCaseCommand, GetCaseCommand, UpdateCaseCommand } = require("@aws-sdk/client-connectcases")
const client = new ConnectCasesClient();
const parameterBuilder = require("./connectParameterBuilder");
const responseBuilder = require("./responseBuilder");
const { getTemplateInfo } = require("./caseTemplateLookUp");

const connectCaseAction = async (event, tenantConfig) => {
  let response = "";
  let command = "";
  const eventBody = JSON.parse(event.body);
  let templateName = eventBody.templateName;

  console.info("Params: ", eventBody);
  try {
    switch (event.resource) {
      case "/createCase":
        try {
          const templateInfo = await getTemplateInfo(templateName);
          console.info("Template Info lookup : ", JSON.stringify(templateInfo));
          const createParams = parameterBuilder.createParameterBuilder(eventBody, tenantConfig, templateInfo);
          console.info("Create Params: ", JSON.stringify(createParams));
          command = new CreateCaseCommand(createParams);
          response = await client.send(command);
          console.info("Create response: ", response);
          return responseBuilder.formatResponse(event, 200, response);
        } catch (error) {
          console.error("Create response: ", error);
          return responseBuilder.formatResponse(event, 400, error);
        }

      case "/updateCase":
        try {
          const updateParams = parameterBuilder.updateParameterBuilder(eventBody, tenantConfig);
          console.info("Update Params: ", JSON.stringify(updateParams));
          command = new UpdateCaseCommand(updateParams);
          response = await client.send(command);
          console.info("Update response: ", response);
          return responseBuilder.formatResponse(event, 200, response);
        } catch (error) {
          console.error("Update response: ", error);
          return responseBuilder.formatResponse(event, 400, error);
        }

      case "/getCase":
        try {
          const getParams = parameterBuilder.getParameterBuilder(eventBody, tenantConfig);
          console.info("Get Params: ", JSON.stringify(getParams));
          command = new GetCaseCommand(getParams);
          response = await client.send(command);
          console.info("Get response: ", response);
          return responseBuilder.formatResponse(event, 200, response);
        } catch (error) {
          console.error("Get response: ", error);
          return responseBuilder.formatResponse(event, 400, error);
        }

      default:
        console.info("default case");
    }
  } catch (error) {
    console.error("connectCaseAction catch error: ", error);
    return responseBuilder.formatResponse(event, 400, error);
  }
};

module.exports = {
  connectCaseAction,
};
