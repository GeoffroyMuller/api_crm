const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import { accessMiddlewareFactory } from "../roles/access.middleware";
import SaleController from "./sale.controller";

const router = express.Router()

router.use(authMiddleware)

router.get('/', SaleController.paginate)
router.post('/', accessMiddlewareFactory('manage_sales'), SaleController.create)
router.put('/:id', accessMiddlewareFactory('manage_sales'), SaleController.update)
router.delete('/:id', accessMiddlewareFactory('manage_sales'), SaleController.delete)
router.get('/:id', SaleController.getById)

export default router;