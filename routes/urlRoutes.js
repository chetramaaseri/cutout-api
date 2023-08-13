const express = require("express");
const router = express.Router();
const {generateUrl} = require("../controllers/urlcontroller");

router.route("/generate").post(generateUrl);


module.exports = router