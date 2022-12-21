

const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import CompanyController from "./company.controller";

const router = express.Router()


router.get('/', authMiddleware, CompanyController.findAll)
router.post('/', authMiddleware, CompanyController.create)
router.put('/:id', authMiddleware, CompanyController.update)
router.delete('/:id',authMiddleware,  CompanyController.deleteById)
router.get('/:id', authMiddleware, CompanyController.getById) 


export default router;