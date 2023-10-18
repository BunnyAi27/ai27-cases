const createParameterBuilder = (eventBody, tenantConfig) => {
  function addTenantArnIfPresent(eventBody, tenantConfig) {
    const fields = eventBody.fields;
    const tenantArn = tenantConfig.Item.casesTenantArn;
    const customerField = fields.find(field => field.id === "customer_id");
  
    if (customerField) {
      customerField.value.tenantArn = tenantArn + customerField.value.stringValue;
    }
  }
  console.info("customerField Params: ", customerField);
  addTenantArnIfPresent(eventBody, tenantConfig);

  const createParams = {
    // CreateCaseRequest
    domainId: tenantConfig.Item.casesDomainId, //"cad6a66d-fea8-4733-8089-b28313a4cca2", // required
    templateId: eventBody.templateId, //"7f5f43ee-9f5c-4550-8b8c-a308264f3753", // required
    fields: eventBody.fields
    //[
      // FieldValueList // required
    //   {
    //     // FieldValue
    //     id: "customer_id", // required
    //     value: {
    //       // FieldValueUnion Union: only one key present
    //       stringValue: tenantConfig.Item.casesCustomerIdArn+eventBody.customerId
    //         //"arn:aws:profile:us-east-1:678201811383:domains/amazon-connect-ai-27-dev/profiles/45fbf14ab8c54c6296ca1617882021fe",
    //       /*doubleValue: Number("double"),
    //         booleanValue: true || false,
    //         emptyValue: {},*/
    //     },
    //   },
    //   {
    //     id: "title", // required
    //     value: {
    //       // FieldValueUnion Union: only one key present
    //       stringValue: eventBody.title,
    //     },
    //   },
    // ],
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
    //[   // TODO check if we can return all without specifying
      // FieldIdentifierList // required
    //   {
    //     // FieldIdentifier
    //     id: "title", // required
    //   },
    //   {
    //     // FieldIdentifier
    //     id: "customer_id", // required
    //   },
    // ],
    //nextToken: "STRING_VALUE",
  };

  return getParams;
};

const updateParameterBuilder = (eventBody, tenantConfig) => {
  const updateParams = {
    // UpdateCaseRequest
    domainId: tenantConfig.Item.casesDomainId, // required
    caseId: eventBody.caseId, // required
    fields: eventBody.fields
    //[
      // FieldValueList // required
    //   {
    //     // FieldValue
    //     id: "title", // required
    //     value: {
    //       // FieldValueUnion Union: only one key present
    //       stringValue: "Updated Case ",
    //       /*doubleValue: Number("double"),
    //     booleanValue: true || false,
    //     emptyValue: {},*/
    //     },
    //   },
    // ],
  };
  return updateParams;
};

module.exports = {
  createParameterBuilder,
  getParameterBuilder,
  updateParameterBuilder,
};
