const logger = require('../config/winston')

function errorHandler(err, req, res, next) {
  logger.error(err.message)
  res.status(500).json({ error: 'Internal Server Error', detail: err.message })
}

module.exports = errorHandler
