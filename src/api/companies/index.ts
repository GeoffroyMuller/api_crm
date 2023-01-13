

const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import CompanyController from "./company.controller";

const router = express.Router()

router.use(authMiddleware);

router.get('/', CompanyController.paginate)
router.post('/', CompanyController.create)
router.put('/:id', CompanyController.update)
router.delete('/:id', CompanyController.delete)
router.get('/:id', CompanyController.getById) 


export default router;