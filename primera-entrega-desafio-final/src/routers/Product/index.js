import { Router } from "express";
import { ProductDao } from "../../Dao/index.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import {
    DATE_UTILS,
    ERRORS_UTILS,
    JOI_VALIDATOR,
    } from "../../utils/index.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const product = await ProductDao.getAll();

        if (!product) {
            return res.send({
                error: ERRORS_UTILS.MESSAGES.NO_PRODUCT
            });
        }

        res.send(product);
    } catch (error) {
        res.send({
            error: "Internal server error"
        });
    }
});

router.get("/:id", async (req, res) => {
    const {
        id
    } = req.params;

    const product = await ProductDao.getById(Number(id));

    res.send(product);
});

router.post("/", verifyRole, async (req, res) => {

    try {

        const {
            title,
            description,
            code,
            thumbnail,
            price,
            stock
        } = req.body

        const product = await JOI_VALIDATOR.product.validateAsync({
            title,
            description,
            code,
            thumbnail,
            price,
            stock,
            timestamp: DATE_UTILS.getTimestamp(),
        });

        const createdProduct = await ProductDao.save(product);

        res.send(createdProduct);

    } catch (error) {
        res.send(error);
    }


});

router.put('/:id', verifyRole, async (req, res) => {
	if (isNaN(req.params.id)) return res.send({ message: 'Ingresá el número del producto que quieres editar' });

	const id = parseInt(req.params.id);

	const data = req.body;

	let update = await ProductDao.updateById(id, data);

	if (!update) return res.send({ message: 'El ID buscado no pertenece a un producto listado' });

	res.send({ message: 'Producto actualizado' });
});


router.delete("/:id", verifyRole, async (req, res) => {
    try {
        const {
            id
        } = req.params;

        await ProductDao.deleteById(Number(id));

        res.send({
            success: true
        });
    } catch (error) {
        console.error(error);
        res.send({
            error: "Ocurrio un error"
        });
    }
});

export {
    router as ProductRouter
};