const axios = require("axios");

const AWIN_API_URL = "https://api.awin.com/publishers/{PUBLISHER_ID}/products";

async function searchAwinProducts(term, pageSize = 30) {
  const token = process.env.AWIN_TOKEN;
  const publisherId = process.env.AWIN_PUBLISHER_ID;
  const url = AWIN_API_URL.replace("{PUBLISHER_ID}", publisherId);

  console.log("AWIN URL:", url);
  console.log("Headers:", { Authorization: `Bearer ${token}` });

  const res = await axios.get(url, {
    params: { query: term, lang: "pt", pageSize },
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("AWIN response:", JSON.stringify(res.data, null, 2));
  return res.data.products.map(/*...*/);
}
