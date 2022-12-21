const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import UserController from "./user.controller";

const router = express.Router()

router.get('/', authMiddleware, UserController.findAll)
router.post('/', UserController.create)
/*
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.deleteById)s
router.get('/:id', UserController.getById)
*/

export default router;