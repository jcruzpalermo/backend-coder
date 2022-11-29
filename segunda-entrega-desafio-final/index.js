import express from 'express'
import { ProductRouter, CartRouter } from './src/routes/index.js'

import { config } from './src/config/index.js'

const app = express()


app.use('/', express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)


app.listen(config.SERVER.PORT, () => console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 10 2da pre entrega`))
app.on('error', error => console.log(`Error del servidor: ${error}`))