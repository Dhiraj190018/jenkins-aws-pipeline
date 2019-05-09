"use strict";
 
require('module-alias/register');
const config = require("@root/config.js");
const app = require("@src/server.js");

app.listen(config.localPort);
