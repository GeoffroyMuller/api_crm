const express = require("express");
import authMiddleware from "../auth/auth.middleware";
import { accessMiddlewareFactory } from "../roles/access.middleware";
import ProductController from "./product.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/", ProductController.paginate);
router.post(
  "/",
  accessMiddlewareFactory("manage_products"),
  ProductController.create
);
router.put(
  "/:id",
  accessMiddlewareFactory("manage_products"),
  ProductController.update
);
router.delete(
  "/:id",
  accessMiddlewareFactory("manage_products"),
  ProductController.delete
);
router.get("/:id", ProductController.getById);

export default router;
