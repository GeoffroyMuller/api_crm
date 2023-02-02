

const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import { accessMiddlewareFactory } from "../roles/access.middleware";
import invoiceController from "./Invoice.controller";

const router = express.Router()

router.use(authMiddleware);

router.get('/', invoiceController.paginate)
router.post('/', accessMiddlewareFactory('manage_invoices'), invoiceController.create)
router.put('/:id', accessMiddlewareFactory('manage_invoices'), invoiceController.update)
router.delete('/:id', accessMiddlewareFactory('manage_invoices'), invoiceController.delete)
router.get('/:id', invoiceController.getById)
router.get('/:id/preview', invoiceController.preview)
router.get('/:id/pdf', invoiceController.getPdf)
router.post('/:id/send_mail', invoiceController.sendByMail)


router.get('/:id/payments', invoiceController.getPayments);
router.post('/:id/payments', accessMiddlewareFactory('manage_invoices'), invoiceController.addPayment);


export default router;