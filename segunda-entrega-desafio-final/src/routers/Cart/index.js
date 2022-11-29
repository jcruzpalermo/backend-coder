import {
  Router
} from "express";
import {
  DATE_UTILS,
  ERRORS_UTILS
} from "../../utils/index.js";
import {
  CartDao,
  ProductDao
} from "../../Dao/index.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  const cart = await CartDao.getById(id);

  res.send({
    success: true,
    cart
  });
});

router.post("/", async (req, res) => {
  const baseCart = {
    timestamp: DATE_UTILS.getTimestamp(),
    products: []
  };

  const cart = await CartDao.save(baseCart);

  res.send({
    success: true,
    cartId: cart.id
  });
});

router.get('/:id/products', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.send({
    message: 'Ingresa el ID de un carrito listado'
  });
  const cartSelected = cart.getById(id);
  if (cartSelected == null) return res.send({
    message: 'Ingresa el ID de un carrito listado'
  });
  res.json(cartSelected.products);
});

router.post("/:cartId/products", async (req, res) => {
  const {
    productId
  } = req.body;
  const {
    cartId
  } = req.params;

  const cart = await CartDao.getById(Number(cartId));

  if (!cart)
    return res.send({
      error: true,
      message: ERRORS_UTILS.MESSAGES.NO_CART
    });

  const product = await ProductDao.getById(Number(productId));

  if (!product)
    return res.send({
      error: true,
      message: ERRORS_UTILS.MESSAGES.NO_PRODUCT
    });

  cart.products.push(product);

  const updatedCart = await CartDao.updateById(Number(cartId), cart);

  res.send({
    success: true,
    cart: updatedCart
  });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.send({
    message: 'Ingresa el ID de un carrito listado'
  });
  const cartDeleted = cart.deleteById(id);
  if (cartDeleted === -1) return res.json({
    message: 'El ID no pertenece a un carrito listado'
  });
  res.json({
    message: 'Carrito eliminado'
  });
});

router.delete('/:id/products/:id_prod', (req, res) => {
  const id = Number(req.params.id);
  const id_prod = Number(req.params.id_prod);
  if (isNaN(id) || isNaN(id_prod)) return res.send({
    message: 'Ingresa el ID de un carrito listado'
  });
  const productDeleted = carts.deleteProduct(id, id_prod);
  if (productDeleted == -1 || !productDeleted) return res.send({
    message: 'Error'
  });
  res.send({
    message: productDeleted
  });
});

export {
  router as CartRouter
};