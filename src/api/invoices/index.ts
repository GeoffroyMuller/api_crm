

const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import InvoiceController from "./invoice.controller";

const router = express.Router()

router.get('/', authMiddleware, InvoiceController.paginate)
router.post('/', authMiddleware, InvoiceController.create)
router.delete('/:id',authMiddleware,  InvoiceController.deleteById)
router.get('/:id', authMiddleware, InvoiceController.getById)
router.get('/:id/pdf', authMiddleware, InvoiceController.getPdf)
router.get('/:id/preview', authMiddleware, InvoiceController.preview)


export default router;