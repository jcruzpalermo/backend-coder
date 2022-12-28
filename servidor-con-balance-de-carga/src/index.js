import express from 'express'
import {
    ProductRouter,
    CartRouter,
    AuthRouter
} from './routes/index.js'
import cors from 'cors'

import {
    PassportAuth
} from './middlewares/index.js'
import session from 'express-session'

import {
    config
} from './config/index.js'
import passport from 'passport'

const cluster = require('cluster')
const os = require('os')

const {
    PORT,
    MODE
} = parseArgs(process.argv.slice(2), {
    alias: {
        p: "PORT",
        m: "MODE",
    },
    default: {
        PORT: 8080,
        MODE: "FORK",
    }
})

if (MODE === 'CLUSTER' && cluster.isPrimary) {
    const numCpus = os.cpus().length
    console.log('SERVIDOR MAESTRO DEL CLUSTER: ')
    console.log('Número de procesadores: ' + numCpus)
    console.log('PID:' + process.pid)
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
        }
        cluster.on('exit', worker => {
            console.log('Worker ' + process.pid + ' exit')
            cluster.fork()
        })
        } else {

const app = express()

PassportAuth.init()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('./public'))


app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)


const server = app.listen(config.SERVER.PORT, () => console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 13 - Inicio de sesión`))
server.on('error', error => console.log(`Error del servidor: ${error}`))
        }