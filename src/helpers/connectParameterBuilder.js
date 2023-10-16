const createParameterBuilder = (eventBody, tenantConfig) => {
  const input = {
    // CreateCaseRequest
    domainId: tenantConfig.Item.casesDomainId, //"cad6a66d-fea8-4733-8089-b28313a4cca2", // required
    templateId: "7f5f43ee-9f5c-4550-8b8c-a308264f3753", // required
    fields: [
      // FieldValueList // required
      {
        // FieldValue
        id: "customer_id", // required
        value: {
          // FieldValueUnion Union: only one key present
          stringValue: tenantConfig.Item.casesCustomerIdArn+eventBody.customerId
            //"arn:aws:profile:us-east-1:678201811383:domains/amazon-connect-ai-27-dev/profiles/45fbf14ab8c54c6296ca1617882021fe",
          /*doubleValue: Number("double"),
            booleanValue: true || false,
            emptyValue: {},*/
        },
      },
      {
        id: "title", // required
        value: {
          // FieldValueUnion Union: only one key present
          stringValue: eventBody.title,
        },
      },
    ],
    //clientToken: "STRING_VALUE",
  };
  return input;
};

const getParameterBuilder = (eventBody, tenantConfig) => {
  const input = {
    // GetCaseRequest
    caseId: eventBody.caseId, //"151dcdcc-e754-399a-97cd-44721e53277b", // required
    domainId: tenantConfig.Item.casesDomainId, // required
    fields: [
      // FieldIdentifierList // required
      {
        // FieldIdentifier
        id: "title", // required
      },
      {
        // FieldIdentifier
        id: "customer_id", // required
      },
    ],
    //nextToken: "STRING_VALUE",
  };

  return formattedresponse;
};

const updateParameterBuilder = (eventBody, tenantConfig) => {
  const input = {
    // UpdateCaseRequest
    domainId: tenantConfig.Item.casesDomainId, // required
    caseId: eventBody.caseId, // required
    fields: [
      // FieldValueList // required
      {
        // FieldValue
        id: "title", // required
        value: {
          // FieldValueUnion Union: only one key present
          stringValue: "Updated Case ",
          /*doubleValue: Number("double"),
        booleanValue: true || false,
        emptyValue: {},*/
        },
      },
    ],
  };
  return formattedresponse;
};

module.exports = {
  createParameterBuilder,
  getParameterBuilder,
  updateParameterBuilder,
};
