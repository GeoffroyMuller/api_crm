const express = require('express')
import QuoteController from "./quote.controller";
import authMiddleware from "../auth/auth.middleware";

const router = express.Router()

router.use(authMiddleware)

router.get('/', QuoteController.paginate)
router.post('/', QuoteController.create)
router.put('/:id', QuoteController.update)
router.delete('/:id', QuoteController.delete)
router.get('/:id', QuoteController.getById)
router.get('/:id/preview', QuoteController.preview)
router.get('/:id/pdf', QuoteController.getPdf)
router.post('/:id/send_mail', QuoteController.sendByMail)

export default router;