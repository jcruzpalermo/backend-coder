import express from "express";
import { addCart, deleteCart, getProducts, addProduct, deleteProduct } from "../controllers/controllerCarts.js";

const routerCarts = express.Router();

// Add cart
routerCarts.post('/', addCart);

// Delete cart
routerCarts.delete('/:id', deleteCart);

// Get products from cart
routerCarts.get('/:id/products', getProducts);

// Add product to cart
routerCarts.post('/:id/products', addProduct);

// Delete product from cart
routerCarts.delete('/:id/products/:id_prod', deleteProduct);

export default routerCarts;