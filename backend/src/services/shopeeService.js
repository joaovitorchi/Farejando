const axios = require("axios");
const crypto = require("crypto");

const PARTNER_ID = +process.env.SHOPEE_PARTNER_ID; 
const PARTNER_KEY = process.env.SHOPEE_PARTNER_KEY; 
const SHOP_ID = +process.env.SHOPEE_SHOP_ID;

const API_URL = "https://partner.shopeemobile.com/api/v2/product/get_item_list";

async function getShopeeProducts() {
  const timestamp = Math.floor(Date.now() / 1000);


  const baseString = `${PARTNER_ID}${API_URL}${timestamp}${ACCESS_TOKEN || ""}${
    SHOP_ID || ""
  }`;
  const sign = crypto
    .createHmac("sha256", PARTNER_KEY)
    .update(baseString)
    .digest("hex");

  const body = {
    partner_id: PARTNER_ID,
    timestamp,
    shop_id: SHOP_ID,
    page_size: 10,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: sign,
    },
  };

  const res = await axios.post(API_URL, body, config);
  return res.data;
}

module.exports = { getShopeeProducts };
