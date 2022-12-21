const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import ClientController from "./client.controller";

const router = express.Router()

router.get('/', authMiddleware, ClientController.findAll)
router.post('/', authMiddleware, ClientController.create)
router.put('/:id', authMiddleware, ClientController.update)
router.delete('/:id',authMiddleware,  ClientController.deleteById)
router.get('/:id', authMiddleware, ClientController.getById)

export default router;