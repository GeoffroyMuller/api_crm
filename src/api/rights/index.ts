import { Request, Response } from "express";
import RIGHTS from "../roles/rights";

const express = require("express");


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json(RIGHTS);
})

export default router;
