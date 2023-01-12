import express from 'express'
import {
    ProductRouter,
    CartRouter,
    AuthRouter,
    Separado
} from './routes/index.js'
import cors from 'cors'

import {
    PassportAuth
} from './middlewares/index.js'
import session from 'express-session'
import {fileURLToPath} from 'url';
import {
    config
} from './config/index.js'
import passport from 'passport'
import path from 'path';
import cluster from 'cluster';
import logger from "./loggers/Log4jsLogger.js";
import loggerMiddleware from "./middlewares/routesLogger.middleware.js";
import minimist from 'minimist';
import compression from 'compression';
import  parseArgs from 'minimist'


const args = parseArgs(process.argv.slice(2))
const CLUSTER = args.CLUSTER

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (CLUSTER) {
    if (cluster.isPrimary) {
        console.log(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`);

        for (let i = 0; i < INFO.numeroCPUs; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            console.log(`Worker ${worker.process.pid} finalizado.`);
            cluster.fork();
        });
    } else {
        console.log(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    console.log(`No es un cluster`);
}

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
app.use(loggerMiddleware);
app.use(express.static('./public'))
app.use(compression());


const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }};

app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)


const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => logger.error(err));
        