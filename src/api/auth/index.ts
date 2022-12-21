const express = require('express')
import AuthController from "./auth.controller";

const router = express.Router()

router.post('/login', AuthController.login)

export default router;