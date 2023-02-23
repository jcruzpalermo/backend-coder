import axios from "axios";
import logger from '../loggers/loggers.js'


class Test {
    constructor() { }

    async getAll() {
        try {
            const url = 'http://localhost:8080/api/products'
            const response = await axios.get(url)
            console.log(response.data);
            logger.info('TODOS LOS PRODUCTOS LOCALIZADOS POR EL TEST AXIOS')
        } catch (error) {
            // console.log('Error en TEST AXIOS getAll', error);
            logger.error('Error en TEST AXIOS getAll', error);
        }
    }

    async getById(id) {
        try {
            const url = `http://localhost:8080/api/products/${id}`
            const response = await axios.get(url)
            console.log(response.data);
            logger.info('PRODUCTO ENCONTRADO POR TEST AXIOS')
        } catch (error) {
            // console.log('Error en TEST AXIOS getById', error);
            logger.error('Error en TEST AXIOS getById', error)
        }
    }

    async createProduct(product) {
        try {
            const url = 'http://localhost:8080/api/products/create-product'
            const response = await axios.post(url, product)
            console.log(response.data);
            logger.info('PRODUCTO CREADO POR AXIOS')
        } catch (error) {
            // console.log('Error en TEST AXIOS createProduct', error);
            logger.error('Error en TEST AXIOS createProduct', error)
        }
    }

    async deteteProduct(id) {
        try {
            const url = `http://localhost:8080/api/products/${id}`
            const response = await axios.delete(url)
            console.log(response.data);
            logger.info('PRODUCTO ELIMINADO POR TEST AXIOS');
        } catch (error) {
            // console.log('Error en TEST AXIOS deleteProduct', error);
            logger.error('Error en TEST AXIOS deleteProduct', error)
        }
    }
}


export { Test }