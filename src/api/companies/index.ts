

const express = require('express')
import authMiddleware from "../auth/auth.middleware";
import { accessMiddlewareFactory } from "../roles/access.middleware";
import CompanyController from "./company.controller";

const router = express.Router()

router.use(authMiddleware);

router.get('/', CompanyController.paginate)
router.post('/', accessMiddlewareFactory('manage_clients'), CompanyController.create)
router.put('/:id', accessMiddlewareFactory('manage_clients'), CompanyController.update)
router.delete('/:id', accessMiddlewareFactory('manage_clients'), CompanyController.delete)
router.get('/:id', CompanyController.getById) 


export default router;