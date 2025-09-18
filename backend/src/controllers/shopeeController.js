const { getShopeeItemList } = require("../services/shopeeApiService");

async function getProducts(req, res, next) {
  try {
    const { page = 1, size = 10 } = req.query;
    const items = await getShopeeItemList(Number(size), Number(page));
    res.json({ items });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar produtos Shopee", detail: err.message });
  }
}

module.exports = { getProducts };
