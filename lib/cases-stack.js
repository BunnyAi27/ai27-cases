const { Stack, Duration } = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");
const iam = require("aws-cdk-lib/aws-iam");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const cognito = require("aws-cdk-lib/aws-cognito");
const logs = require("aws-cdk-lib/aws-logs");

class casesStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props, envVariables) {
    super(scope, id, props, envVariables);

    //Call environment variable here
    console.log("env variables: ", envVariables);
    const prefix = envVariables.prefix;
    const env = envVariables.environment;
    const featureName = envVariables.featureName;
    const region = envVariables.region;
    const accountId = envVariables.accountId;
    const userPool = envVariables.cognitoAPIUserPool;
    const authScopeCreate = envVariables.authScopeCreate;
    const authScopeUpdate = envVariables.authScopeUpdate;
    const authScopeGet = envVariables.authScopeSearch;
    const tenantConfigTable = envVariables.tenantConfigTableName;

    //Role to provide lambda access to dynamodb table, cloudwatch and connect
    const casesRole = new iam.Role( this, "ai27-" + env + "-case-role",
      {
        roleName: prefix + "-" + env + "-" + featureName,
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      }
    );

    casesRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "cases:CreateCase",
          "cases:UpdateCase",
          "cases:GetCase"
        ],
        resources: [
          "arn:aws:cases:" + region + ":" + accountId + ":domain/*",
          "arn:aws:cases:" + region + ":" + accountId + ":domain/*/template/*",
				  "arn:aws:cases:" + region + ":" + accountId + ":domain/*/case/*",
				  "arn:aws:cases:" + region + ":" + accountId + ":domain/*/field/*"
        ],
      })
    );

    casesRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "dynamodb:GetItem"
        ],
        resources: [
          "arn:aws:dynamodb:" + region + ":" + accountId + ":table/*"
        ]
      })
    );

    casesRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );

    //DynamoDB table to store template specific information
    const templateInformationTable = new dynamodb.TableV2( this,"ai27-" + env + "-cases-table",
      {
        tableName: prefix + "-" + env + "-" + featureName + "-templateInformation",
        partitionKey: { name: "templateName", type: dynamodb.AttributeType.STRING },
      }
    );

 
    //Lambda function to enable cases functionality
    const caseLambda = new lambda.Function( this,"ai27-" + env + "-case-lambda",
      {
        functionName: prefix + "-" + env + "-" + featureName,
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("src"),
        role: casesRole,
        environment: {
          TENANT_CONFIG_TABLE_NAME: tenantConfigTable,
          CASES_TEMPLATE_LOOK_UP: templateInformationTable.tableName,
        },
      }
    );

    // Provide access to dynamodb table for lambda function
    templateInformationTable.grantWriteData(caseLambda);
    templateInformationTable.grantReadData(caseLambda);

    const cognitoAPIUserPool = cognito.UserPool.fromUserPoolArn( this, "ai27-" + env + "-case-userPool",
      userPool
    );

    const apiAuth = new apigateway.CognitoUserPoolsAuthorizer( this, "ai27-" + env + "-case-apiAuth",
      {
        authorizerName: prefix + "-" + env + "-" + featureName,
        cognitoUserPools: [cognitoAPIUserPool],
      }
    );

    const apiLogGroup = new logs.LogGroup( this, "ai27-" + env + "-case-apiLogs"
    );

    //API gateway for cases actions
    const caseApiGateway = new apigateway.LambdaRestApi( this, "ai27-" + env + "-case-apiGateway",
      {
        restApiName: prefix + "-" + env + "-" + featureName,
        handler: caseLambda,
        proxy: false,
        deployOptions: {
          stageName: "dev",
          accessLogDestination: new apigateway.LogGroupLogDestination(
            apiLogGroup
          ),
          accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
            caller: false,
            httpMethod: true,
            ip: true,
            protocol: true,
            requestTime: true,
            resourcePath: true,
            responseLength: true,
            status: true,
            user: true,
          }),
        },
      }
    );

    new apigateway.RestApi(this, "ai27-" + env + "-case-apiGateway-Cors", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent']  // this is also the default
      }
    })

    apiAuth._attachToApi(caseApiGateway);

    const createCase = caseApiGateway.root.addResource("createCase");
    createCase.addMethod("POST"),
      {
        authorizationType: apigateway.AuthorizationType.COGNITO,
        authorizer: apiAuth,
        authorizationScopes: [authScopeCreate],
        requestTemplates: {
          "application/json": '{ "statusCode": "200" }',
        },
        integrationResponses: [{
          statusCode: '200',
        }],
      };

    const updateCase = caseApiGateway.root.addResource("updateCase");
    updateCase.addMethod("POST"),
      {
        authorizationType: apigateway.AuthorizationType.COGNITO,
        authorizer: apiAuth,
        authorizationScopes: [authScopeUpdate],
        requestTemplates: {
          "application/json": '{ "statusCode": "200" }',
        },
        integrationResponses: [{
          statusCode: '200',
        }],
      };

    const getCase = caseApiGateway.root.addResource("getCase");
    getCase.addMethod("POST"),
      {
        authorizationType: apigateway.AuthorizationType.COGNITO,
        authorizer: apiAuth,
        authorizationScopes: [authScopeGet],
        requestTemplates: {
          "application/json": '{ "statusCode": "200" }',
        },
        integrationResponses: [{
          statusCode: '200',
        }],
      };
  }
}

module.exports = { casesStack };