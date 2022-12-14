import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { engine } from "express-handlebars";
import Container from "./container.js";
import { optionsMariaDB, optionsSQLite3 } from "./options/config.js";


const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const products = new Container(optionsSQLite3, 'products');
const messages = new Container(optionsMariaDB, 'messages');

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    res.render('form');
});

io.on('connection', async socket => {
    console.log('Conexión establecida');
    const dbProducts = await products.getAll();
    io.sockets.emit('products', dbProducts);
    const dbMessages = await messages.getAll();
    io.sockets.emit('messages', dbMessages);
    socket.on('product', async product => {
        products.save(product);
        const dbProducts = await products.getAll();
        io.sockets.emit('products', dbProducts);
    })
    socket.on('message', async message => {
        messages.save(message);
        const dbMessages = await messages.getAll();
        io.sockets.emit('messages', dbMessages);
    })
})

const server = httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', () => console.log(`Error: ${err}`));