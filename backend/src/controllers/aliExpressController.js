const { searchAliExpressProducts } = require("../services/aliexpressService");

async function getAliExpressOffers(req, res, next) {
  try {
    const { term, page = 1, size = 10 } = req.query;
    if (!term)
      return res.status(400).json({ error: "term parameter is required" });
    const items = await searchAliExpressProducts(
      term,
      Number(page),
      Number(size)
    );
    res.json({ items });
  } catch (err) {
    res.status(500).json({
      error: "Erro ao buscar produtos AliExpress",
      detail: err.message,
    });
  }
}

module.exports = { getAliExpressOffers };
