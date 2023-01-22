const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import SaleController from "./sale.controller";

const router = express.Router()

router.get('/', authMiddleware, SaleController.paginate)
router.post('/', authMiddleware, SaleController.create)
router.put('/:id', authMiddleware, SaleController.update)
router.delete('/:id',authMiddleware, SaleController.delete)
router.get('/:id', authMiddleware, SaleController.getById)

export default router;