const deleteParamaterBuilder = (eventBody) => {
    const input = { // DeleteProfileRequest
        ProfileId: "STRING_VALUE", // required
        DomainName: "STRING_VALUE", // required
      }
    return input;
  };

  const createParamaterBuilder = (eventBody) => {
    const input = { // CreateProfileRequest
        DomainName: "STRING_VALUE", // required
        AccountNumber: "STRING_VALUE",
        AdditionalInformation: "STRING_VALUE",
        PartyType: "INDIVIDUAL" || "BUSINESS" || "OTHER",
        BusinessName: "STRING_VALUE",
        FirstName: "STRING_VALUE",
        MiddleName: "STRING_VALUE",
        LastName: "STRING_VALUE",
        BirthDate: "STRING_VALUE",
        Gender: "MALE" || "FEMALE" || "UNSPECIFIED",
        PhoneNumber: "STRING_VALUE",
        MobilePhoneNumber: "STRING_VALUE",
        HomePhoneNumber: "STRING_VALUE",
        BusinessPhoneNumber: "STRING_VALUE",
        EmailAddress: "STRING_VALUE",
        PersonalEmailAddress: "STRING_VALUE",
        BusinessEmailAddress: "STRING_VALUE",
        Address: { // Address
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        ShippingAddress: {
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        MailingAddress: {
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        BillingAddress: {
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        Attributes: { // Attributes
          "<keys>": "STRING_VALUE",
        },
        PartyTypeString: "STRING_VALUE",
        GenderString: "STRING_VALUE",
    }
    return input;   
  };

  const searchParamaterBuilder = (eventBody) => {
    const input = { // SearchProfilesRequest
        NextToken: "STRING_VALUE",
        MaxResults: Number("int"),
        DomainName: "STRING_VALUE", // required
        KeyName: "STRING_VALUE", // required
        Values: [ // requestValueList // required
          "STRING_VALUE",
        ],
        AdditionalSearchKeys: [ // additionalSearchKeysList
          { // AdditionalSearchKey
            KeyName: "STRING_VALUE", // required
            Values: [ // required
              "STRING_VALUE",
            ],
          },
        ],
        LogicalOperator: "AND" || "OR",
      }
    return formattedresponse;   
  };

  const updateParamaterBuilder = (eventBody) => {
    const input = { // UpdateProfileRequest
        DomainName: "STRING_VALUE", // required
        ProfileId: "STRING_VALUE", // required
        AdditionalInformation: "STRING_VALUE",
        AccountNumber: "STRING_VALUE",
        PartyType: "INDIVIDUAL" || "BUSINESS" || "OTHER",
        BusinessName: "STRING_VALUE",
        FirstName: "STRING_VALUE",
        MiddleName: "STRING_VALUE",
        LastName: "STRING_VALUE",
        BirthDate: "STRING_VALUE",
        Gender: "MALE" || "FEMALE" || "UNSPECIFIED",
        PhoneNumber: "STRING_VALUE",
        MobilePhoneNumber: "STRING_VALUE",
        HomePhoneNumber: "STRING_VALUE",
        BusinessPhoneNumber: "STRING_VALUE",
        EmailAddress: "STRING_VALUE",
        PersonalEmailAddress: "STRING_VALUE",
        BusinessEmailAddress: "STRING_VALUE",
        Address: { // UpdateAddress
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        ShippingAddress: {
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        MailingAddress: {
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        BillingAddress: {
          Address1: "STRING_VALUE",
          Address2: "STRING_VALUE",
          Address3: "STRING_VALUE",
          Address4: "STRING_VALUE",
          City: "STRING_VALUE",
          County: "STRING_VALUE",
          State: "STRING_VALUE",
          Province: "STRING_VALUE",
          Country: "STRING_VALUE",
          PostalCode: "STRING_VALUE",
        },
        Attributes: { // UpdateAttributes
          "<keys>": "STRING_VALUE",
        },
        PartyTypeString: "STRING_VALUE",
        GenderString: "STRING_VALUE",
      };
    return formattedresponse;   
  };
  
  module.exports = {
    createParamaterBuilder,deleteParamaterBuilder, searchParamaterBuilder, updateParamaterBuilder
  };
  
  
  