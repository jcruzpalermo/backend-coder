import { ProductDao } from '../../dao/index.js'
import logger from '../../loggers/loggers.js'
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from '../../utils/index.js'


const getAll = async (req, res) => {
    try {
        const allProducts = await ProductDao.getAll()
        res.render('table-products.hbs', { data: allProducts })
    } catch (error) {
        console.log(error, `error from getAll`);
        logger.error('error desde el getAll: ' + error)
        res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.getById(id)
        if (!product) {
            return res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
        }
        res.send({ success: true, data: product })
    } catch (error) {
        logger.error(error, `error from getById`)
        console.log(error, `error from getById`);
        res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
    }
}

const createProduct = async (req, res, cb) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body

        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp(), })

        await ProductDao.save(product)

        res.redirect('/api/products/')

    } catch (error) {
        logger.error(error, `error from createProduct`);
        console.log(error, `error from createProduct`);
        res.redirect('/api/products/')
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.deleteById(id)

        if (!product) {
            return res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
        }

        res.send({ success: true, data: product })
        // res.redirect('/api/products/')

    } catch (error) {
        logger.error(error, `error from deleteProduct`)
        console.log(error, `error from deleteProduct`);
        res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
    }

}

const listProducts = async (req, res) => {
    try {
        const allProducts = await ProductDao.getAll()
        res.render('list-products.hbs', { data: allProducts })
    } catch (error) {
        console.log(error, `error from listProducts`);
        logger.error('error desde el listProducts: ' + error)
        res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
    }
}

const viewsCreateProduct = async (req, res) => {
    res.render('create-product.hbs')
}

export const ProductController = { getAll, getById, createProduct, deleteProduct, listProducts, viewsCreateProduct }