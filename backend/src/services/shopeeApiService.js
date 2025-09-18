const axios = require("axios");
const crypto = require("crypto");

)
const PARTNER_ID = 1234567;
const PARTNER_KEY = "abcdeFGHlmnopqrstuvwxyz1234567890";
const SHOP_ID = 222333444;


const API_URL =
  "https://partner.test-stable.shopeemobile.com/api/v2/product/get_item_list";


async function getShopeeItemList(pageSize = 10, pageNumber = 1) {

  const timestamp = Math.floor(Date.now() / 1000);


  const path = "/api/v2/product/get_item_list";
  const baseString = `${PARTNER_ID}${path}${timestamp}${SHOP_ID}`;
  const sign = crypto
    .createHmac("sha256", PARTNER_KEY)
    .update(baseString)
    .digest("hex");

  const body = {
    partner_id: PARTNER_ID,
    shop_id: SHOP_ID,
    timestamp,
    offset: (pageNumber - 1) * pageSize,
    page_size: pageSize,
  };

  try {
    const response = await axios.post(API_URL, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sign,
      },
    });


    const items =
      (response.data &&
        response.data.response &&
        response.data.response.item) ||
      [];

    return items.map((it) => ({
      item_id: it.item_id,
      name: it.item_name || "Produto Shopee",
      price: (it.price_max || it.price_min) / 100000, 
      image_url: it.image
        ? `https://down-br.img.susercontent.com/file/${it.image}`
        : null,
      link: `https://shopee.com.br/product/${SHOP_ID}/${it.item_id}`,
    }));
  } catch (err) {
    console.error("Erro Shopee:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getShopeeItemList };
