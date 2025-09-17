const pool = require('../config/db')

async function saveOffer(offer) {
  const { title, price, link, source } = offer
  const result = await pool.query(
    `INSERT INTO offers (title, price, link, source) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, price, link, source]
  )
  return result.rows[0]
}

module.exports = { saveOffer }
