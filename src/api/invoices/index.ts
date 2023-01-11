

const express = require('express')
import authMiddleware from "../auth/auth.middleware";

const router = express.Router()

router.use(authMiddleware);

export default router;