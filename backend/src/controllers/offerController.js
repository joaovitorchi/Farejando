const { searchAwinProducts } = require("../services/awinService");

async function getOffers(req, res, next) {
  try {
    const { term } = req.query;
    const awinResults = await searchAwinProducts(term);
    // Opcional: salvar no banco, unificar com Shopee, etc.
    return res.status(200).json({ offers: awinResults });
  } catch (e) {
    next(e);
  }
}

module.exports = { getOffers };
