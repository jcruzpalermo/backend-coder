import express  from 'express';
import { Container } from './src/containers/Container.js';

const PORT = 8080;
const app = express();
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/api', routerProductos);












// const productos = new Container('productos');

// app.get('/productos', async (req, res) => {
//     const mostrarProductos = await productos.getAll();
//     res.send(mostrarProductos);
// })

// app.get('/productoRandom', async (req, res) => {
//     const p = await productos.getAll();
//     const numeroRandom = Math.floor(Math.random() * p.length);
//     res.send(p[numeroRandom]);
// })




// const ProductContainer = new Container("productos");
// const CartContainer = new Container("carrito");
// ProductContainer.getAll().then((data) => console.log({data})).catch((error) => console.log({error}))

// ProductContainer.save({
//     title: "Producto 1",
//     price: 300, 
//     thumbnail: "http..."
// }).then(data => console.log({data})).catch(error => console.log({error}));

// ProductContainer.getById(2).then((Juan) => console.log({ Juan })).catch((error) => console.log({error}))

//ProductContainer.deleteById(6).then((data) => console.log({ data }));

//ProductContainer.deleteAll();




// const probarMetodos = async () => {
//    try{
//     const obtenerProductos = await ProductContainer.getAll();
//    }
//     console.log({obtenerProductos});

//     } catch (error) {
//console.log({error});
//      }

//     probarMetodos();

// CartContainer.getAll().then((data) => console.log({ data }));

// CartContainer.save({ name: "Lautaro", products: [] });


// ProductContainer.update({
//   id: 2,
//   newData: { title: "Producto 2 MODD", price: 1000 },
// });

// const updateCart = async ({ idCarrito, idProduct }) => {
//     try {
//         const cart = await CartContainer.getById(idCarrito);
//         if (!cart) return "Cart Not Found";

//         const product = await ProductContainer.getById(idProduct);

//         if (!product) return "Product not found";

//         cart.products.push(product);
//         // console.log({ cart });
//         await CartContainer.update({
//             id: idCarrito,
//             newData: { products: cart.products },
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// updateCart({idCarrito: 1, idProduct: 3});








