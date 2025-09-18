const axios = require("axios");
const crypto = require("crypto");

const APP_KEY = "513368";
const APP_SECRET = "YrBLMX8KOATgtw7718cMJADCOrrM8llt";

function getSign(params, secret) {
  const sortedKeys = Object.keys(params).sort();
  let baseString = secret;
  for (let key of sortedKeys) {
    baseString += key + params[key];
  }
  baseString += secret;
  return crypto
    .createHash("md5")
    .update(baseString)
    .digest("hex")
    .toLowerCase();
}

async function searchAliExpressProducts(keyword, page = 1, pageSize = 10) {
  const timestamp = Date.now();
  const fields =
    "productId,productTitle,productUrl,imageUrl,salePrice,commissionRate,shopUrl";
  let params = {
    appKey: APP_KEY,
    keywords: keyword,
    fields,
    pageNo: page,
    pageSize,
    timestamp,
  };

  const sign = getSign(params, APP_SECRET);
  params.sign = sign;

  const searchParams = new URLSearchParams(params);

  try {
    const { data } = await axios.post(
      `https://api-portals.aliexpress.com/api/product/search`,
      searchParams.toString(), // <--- body!
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(JSON.stringify(data, null, 2));
    if (!data || !data.products) return [];
    return data.products.map((item) => ({
      id: item.productId,
      title: item.productTitle,
      price: item.salePrice,
      commission: item.commissionRate,
      url: item.productUrl,
      image: item.imageUrl,
      shop_url: item.shopUrl || null,
      source: "AliExpress",
    }));
  } catch (err) {
    console.error("AliExpress API error:", err.response?.data || err.message);
    throw err;
  }
}
module.exports = { searchAliExpressProducts };
