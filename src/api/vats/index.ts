const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import VatController from "./vat.controller";

const router = express.Router()

router.get('/', authMiddleware, VatController.findAll)
router.post('/', authMiddleware, VatController.create)
router.put('/:id', authMiddleware, VatController.update)
router.delete('/:id',authMiddleware,  VatController.deleteById)


export default router;