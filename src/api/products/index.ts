const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import ProductController from "./product.controller";

const router = express.Router()

router.get('/', authMiddleware, ProductController.paginate)
router.post('/', authMiddleware, ProductController.create)
router.put('/:id', authMiddleware, ProductController.update)
router.delete('/:id',authMiddleware, ProductController.delete)
router.get('/:id', authMiddleware, ProductController.getById)

export default router;