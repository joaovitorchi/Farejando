const express = require("express")
const compression = require("compression")
const cors = require("cors")
const dotenv = require("dotenv")
const winston = require('./config/winston')
const { swaggerUi, swaggerDocument } = require('./config/swagger')
const offerRoutes = require('./routes/offerRoutes')
const errorHandler = require('./middlewares/errorHandler')

dotenv.config()
const app = express()

app.use(compression())
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

// Log todas as requisições
app.use((req, res, next) => {
  winston.info(`${req.method} ${req.path}`)
  next()
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/offers', offerRoutes)
app.use(errorHandler)

module.exports = app