
const express = require('express');
import controller from "./right.controller";

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById) 

export default router;
