"use strict";
 
const config = require("@root/config");
const router = require("express").Router();

//router.post("/", authorize, (req, res, next) =>
router.post("/", (req, res) => {
    res.write("Hello World");
    res.end();
});

router.get("/", (req, res) => {
    res.write("Hello World");
    res.end();
});

module.exports = router;
