"use strict";
 
require('module-alias/register')  
const awspress = require("aws-serverless-express");
const app = require("@src/server");
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);

