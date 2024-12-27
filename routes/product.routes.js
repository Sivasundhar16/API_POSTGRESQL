import { Router } from "express";
import { orderToday } from "../controller/product.controller.js";

const router = Router();

router.get("/order/today", orderToday);

export default router;
