const connectCasesHelper = require("./helpers/connectCasesHelper");
const responseBuilder = require("./helpers/responseBuilder");
const { getTenantConfiguration } = require("./helpers/getTenantConfig");

exports.handler = async (event) => {
  // TODO implement
  console.info("Event", JSON.stringify(event));
  const tenantId = event.headers.tenantId.toLowerCase();
  const tenantConfig = await getTenantConfiguration(tenantId);

  try {
    switch (tenantConfig.Item.dataSource.toLowerCase()) {
      case "connect":
        return await connectCasesHelper.connectCaseAction(event,tenantConfig);
      case "thirdpart":
        return await connectCasesHelper.connectCaseAction(event,tenantConfig);
      default:
        return await connectCasesHelper.connectCaseAction(event,tenantConfig);
    }
  } catch (error) {
    console.error("index: error: ", error);
    const errResp = {
      errorMessage: "An Error occurred please contact your administrator",
    };
    return responseBuilder.formatResponse(event, 500, errResp);
  }
};