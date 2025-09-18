const express = require("express");
const router = express.Router();
const { getAliExpressOffers } = require("../controllers/aliexpressController");

router.get("/offers", getAliExpressOffers);

module.exports = router;
