const axios = require('axios')

const AWIN_API_URL = "https://api.awin.com/publishers/{PUBLISHER_ID}/products"
const AWIN_TOKEN = process.env.AWIN_TOKEN

async function searchAwinProducts(term, pageSize = 30) {
  const url = AWIN_API_URL.replace('{PUBLISHER_ID}', process.env.AWIN_PUBLISHER_ID)
  const res = await axios.get(url, {
    params: { query: term, lang: "pt", pageSize },
    headers: { Authorization: `Bearer ${AWIN_TOKEN}` }
  })
  // Trate e sanitize o retorno aqui!
  return res.data
}

module.exports = { searchAwinProducts }
