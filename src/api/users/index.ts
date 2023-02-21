const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import controller from "./user.controller";

const router = express.Router()

router.use(authMiddleware);

router.get('/', controller.paginate)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.get('/:id', controller.getById) 


export default router;