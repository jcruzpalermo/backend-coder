import express from 'express'
import handlebars from 'express-handlebars'
import { ProductRouter, CartRouter, AuthRouter, InfoRouter, RandomRouter, HomeRouter, GraphqlRouter } from './src/routes/index.js'
import cors from 'cors'

import { PassportAuth } from './src/middlewares/index.js'
import session from 'express-session'

import { config } from './src/config/index.js'
import passport from 'passport'

import cluster from 'cluster'
import { INFO } from './src/utils/index.js'

import logger from './src/loggers/loggers.js'




export const app = express()

PassportAuth.init()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
}))

app.set('view engine', 'hbs')
app.set('views', './public/views')

app.use(express.static('./public'))


app.use('/', HomeRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/randoms', RandomRouter)
app.use('/api/info', InfoRouter)
app.use('/api/graphql', GraphqlRouter);

import parseArgs from 'minimist'
const args = parseArgs(process.argv.slice(2))
const CLUSTER = args.CLUSTER

app.listen(config.SERVER.PORT, () => {
    logger.info(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 20 - Mejorar la arquitectura de nuestra API`)
    console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 20 - Mejorar la arquitectura de nuestra API`)
}).on('error', error => {
    logger.error(`Error del servidor: ${error}`)
})


if (CLUSTER) {
    if (cluster.isPrimary) {
        logger.info(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`)

        for (let i = 0; i < INFO.numeroCPUs; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            logger.info(`Worker ${worker.process.pid} finalizado.`);
            cluster.fork();
        });

    } else {
        logger.info(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    logger.info(`http://localhost:${config.SERVER.PORT}/`)
    logger.info(`No es un cluster`);
}