"use strict";

require('module-alias/register')  
const config = require("@root/config")
const xray = require("aws-xray-sdk");
const bodyParser = require("body-parser");
const app = require("express")();
const genrec = require("@src/generate-receipt");

app.use(xray.express.openSegment(config.xraySegment));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/buy/retail_receipts/v1", genrec);

app.use(xray.express.closeSegment());

module.exports = app;