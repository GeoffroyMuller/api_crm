const express = require("express");
import authMiddleware from "../auth/auth.middleware";
import controller from "./reservation.controller";

const router = express.Router();

router.get("/", authMiddleware, controller.getAll);
router.post("/", authMiddleware, controller.create);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.delete);
router.get("/:id", authMiddleware, controller.getById);

export default router;
