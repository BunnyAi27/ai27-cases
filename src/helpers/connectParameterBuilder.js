const createParameterBuilder = (eventBody, tenantConfig, templateInfo) => {
  function addTenantArnIfPresent(eventBody, tenantConfig) {
    const fields = eventBody.fields;
    const tenantArn = tenantConfig.Item.casesCustomerIdArn;
    const customerField = fields.find(field => field.id === "customer_id");
  
    if (customerField) {
      customerField.value.stringValue = tenantArn + customerField.value.stringValue;
    }
    console.info("customerField Params: ", customerField);
  }
  addTenantArnIfPresent(eventBody, tenantConfig);
  //const templateId = templateInfo.Item.templateId.toLowerCase()
  const createParams = {
    // CreateCaseRequest
    domainId: tenantConfig.Item.casesDomainId, //"cad6a66d-fea8-4733-8089-b28313a4cca2", // required
    templateId: templateInfo.Item.templateId,//"7f5f43ee-9f5c-4550-8b8c-a308264f3753", // required
    fields: eventBody.fields
    //clientToken: "STRING_VALUE",
  };
  
  return createParams;
};

const getParameterBuilder = (eventBody, tenantConfig) => {
  const getParams = {
    // GetCaseRequest
    caseId: eventBody.caseId, //"151dcdcc-e754-399a-97cd-44721e53277b", // required
    domainId: tenantConfig.Item.casesDomainId, // required
    fields: eventBody.fields
  };

  return getParams;
};

const updateParameterBuilder = (eventBody, tenantConfig) => {
  const updateParams = {
    // UpdateCaseRequest
    domainId: tenantConfig.Item.casesDomainId, // required
    caseId: eventBody.caseId, // required
    fields: eventBody.fields
  };
  return updateParams;
};

module.exports = {
  createParameterBuilder,
  getParameterBuilder,
  updateParameterBuilder,
};
