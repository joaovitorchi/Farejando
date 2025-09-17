// /src/controllers/offerController.js
const { searchAwinProducts } = require("../services/awinService");

async function getOffers(req, res, next) {
  try {
    const { term } = req.query;
    if (!term)
      return res.status(400).json({ error: "term parameter is required" });

    const offers = await searchAwinProducts(term);
    return res.status(200).json({ offers });
  } catch (e) {
    next(e);
  }
}

module.exports = { getOffers };
