const express = require('express')
import QuoteController from "./quote.controller";
import authMiddleware from "../auth/auth.middleware";

const router = express.Router()

router.get('/', authMiddleware, QuoteController.paginate)
router.post('/', authMiddleware, QuoteController.create)
router.put('/:id', authMiddleware, QuoteController.update)
router.delete('/:id',authMiddleware,  QuoteController.deleteById)
router.get('/:id', authMiddleware, QuoteController.getById)
router.get('/:id/pdf', authMiddleware, QuoteController.getPdf)
router.get('/:id/preview', authMiddleware, QuoteController.preview)
router.post('/:id/send_mail', authMiddleware, QuoteController.sendByMail)

export default router;