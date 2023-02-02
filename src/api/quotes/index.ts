const express = require('express')
import QuoteController from "./quote.controller";
import authMiddleware from "../auth/auth.middleware";
import { accessMiddlewareFactory } from "../roles/access.middleware";

const router = express.Router()

router.use(authMiddleware)

router.get('/', QuoteController.paginate)
router.post('/', accessMiddlewareFactory('manage_quotes'), QuoteController.create)
router.put('/:id', accessMiddlewareFactory('manage_quotes'), QuoteController.update)
router.delete('/:id', accessMiddlewareFactory('manage_quotes'), QuoteController.delete)
router.get('/:id', QuoteController.getById)
router.get('/:id/preview', QuoteController.preview)
router.get('/:id/pdf', QuoteController.getPdf)
router.post('/:id/send_mail', QuoteController.sendByMail)

export default router;