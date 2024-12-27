import { Router } from "express";
import { getUser } from "../controller/customer.controller.js";

const router = Router();

router.get("/customer", getUser);

export default router;
