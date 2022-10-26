import  express  from "express";
import { Server as HttpServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat)

import Product from "./models/product/product-model.js";
import Messages from "./models/message/message-model.js";


const app = express();
const httpServer = new HttpServer(app);
const io =  new SocketIoServer(httpServer);

const PORT = 8080;

app.use(express.static("./public"))

httpServer.listen(PORT, () => console.log(`Running on port: ${PORT}`))

io.on('connection', socket => {
    enviarTodosLosProductos(socket)
    enviarTodosLosMensajes(socket)

    socket.on("new product", newProduct =>{
    guardarProducto(newProduct)
})

    socket.on("new message", nuevoMensaje => {
    guardarMensaje(nuevoMensaje)
    })

})

/* -------------------------------------------------------------------------- */
/*                                  PRODUCTOS                                 */
/* -------------------------------------------------------------------------- */
const enviarTodosLosProductos = async (socket) => {
    const allProduct = await Product.getAll()
    socket.emit("all products", allProduct)
    
    
}

const guardarProducto = async (newProduct) =>{
    await Product.save(newProduct)
    const allProduct = await Product.getAll()
    io.sockets.emit("all products", allProduct)
}

/* -------------------------------------------------------------------------- */
/*                                    CHAT                                    */
/* -------------------------------------------------------------------------- */

const guardarMensaje = async (message) =>{
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    const newMessage = { ...message, createdAt: `${dateFormated} hs`}
    await Messages.save(newMessage)
    const allMessage = await Messages.getAll()
    io.sockets.emit("all message", allMessage)
}

const enviarTodosLosMensajes = async (socket) => {
    const allMessage = await Messages.getAll()
    socket.emit("all message", allMessage)
    
}
