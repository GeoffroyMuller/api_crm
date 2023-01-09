const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import ClientController from "./client.controller";

const router = express.Router()

router.use(authMiddleware);

router.get('/', ClientController.getAll)
router.post('/', ClientController.create)
router.put('/:id', ClientController.update)
router.delete('/:id',  ClientController.delete)
router.get('/:id', ClientController.getById)

export default router;