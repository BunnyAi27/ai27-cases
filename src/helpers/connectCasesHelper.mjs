import { ConnectCasesClient, CreateCaseCommand, GetCaseCommand, UpdateCaseCommand } from "@aws-sdk/client-connectcases";
const client = new ConnectCasesClient();
const responseBuilder = require("./responseBuilder");

const connectCaseAction = async (event, tenantConfig) => {
  let response = "";
  let command = "";
  let params = "";
  const eventBody = JSON.parse(event.body);

  console.info("Params: ", eventBody);
  try {
    switch (event.resource) {
      case "/createCase":
        try {
          console.info("Create Params: ", eventBody);
          command = new CreateCaseCommand(eventBody);
          response = await client.send(command);
          console.info("Create response: ", response);
          return responseBuilder.formatResponse(event, 200, response);
        } catch (error) {
          console.error("Create response: ", error);
          return responseBuilder.formatResponse(event, 400, error);
        }

      case "/updateCase":
        try {
          console.info("Delete Params: ", eventBody);
          command = new UpdateCaseCommand(eventBody);
          response = await client.send(command);
          console.info("Delete response: ", response);
          return responseBuilder.formatResponse(event, 200, response);
        } catch (error) {
          console.error("Update response: ", error);
          return responseBuilder.formatResponse(event, 400, error);
        }

      case "/getCase":
        try {
          console.info("Get Params: ", eventBody);
          command = new GetCaseCommand(eventBody);
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
