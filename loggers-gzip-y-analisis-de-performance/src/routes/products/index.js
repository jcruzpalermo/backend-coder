import { Router } from 'express'
import { verifyRole } from '../../middlewares/index.js'
import { ProductController } from '../../controllers/index.js'


const router = Router()

router.get('/', ProductController.getAll)

router.get('/:id', ProductController.getById)

router.post('/', verifyRole, ProductController.createProduct)

router.delete('/:id', ProductController.deleteProduct)



export { router as ProductRouter }