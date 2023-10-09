#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const { casesStack } = require("../lib/cases-stack");

const app = new cdk.App();
const env = app.node.tryGetContext("environment");
const envVariables = app.node.tryGetContext(env);

new casesStack(
  app,
  "casesStack",
  {
    env: { account: envVariables.accountId, region: envVariables.region },
  },
  envVariables
);
