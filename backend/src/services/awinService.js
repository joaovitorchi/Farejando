// /src/services/awinService.js
const axios = require("axios");

const AWIN_API_URL = "https://api.awin.com/publishers/{PUBLISHER_ID}/products";

async function searchAwinProducts(term, pageSize = 30) {
  const token = process.env.AWIN_TOKEN;
  const publisherId = process.env.AWIN_PUBLISHER_ID;
  const url = AWIN_API_URL.replace("{PUBLISHER_ID}", publisherId);

  const res = await axios.get(url, {
    params: { query: term, lang: "pt", pageSize },
    headers: { Authorization: `Bearer ${token}` },
  });

  // Formata só os campos que o frontend precisa
  return res.data.products.map((p) => ({
    title: p.productName,
    price: parseFloat(p.price.amount),
    link: p.awinUrl,
    merchant: p.merchantName,
    source: "Awin",
    image_url: p.imageUrl,
    original_price: p.priceWas ? parseFloat(p.priceWas.amount) : null,
    discount_percent: p.priceWas
      ? (
          (100 * (parseFloat(p.priceWas.amount) - parseFloat(p.price.amount))) /
          parseFloat(p.priceWas.amount)
        ).toFixed(2)
      : null,
    category: p.categoryPath,
  }));
}

module.exports = { searchAwinProducts };
