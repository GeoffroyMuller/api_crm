

const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import invoiceController from "./Invoice.controller";

const router = express.Router()

router.use(authMiddleware);

router.get('/', invoiceController.paginate)
router.post('/', invoiceController.create)
router.put('/:id', invoiceController.update)
router.delete('/:id', invoiceController.delete)
router.get('/:id', invoiceController.getById)


export default router;