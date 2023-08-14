const express = require("express");
const router = express.Router();
const {generateUrl,fetchRouteDetails} = require("../controllers/urlcontroller");

router.route("/generate").post(generateUrl);
router.route("/fetchRoute").post(fetchRouteDetails);


module.exports = router