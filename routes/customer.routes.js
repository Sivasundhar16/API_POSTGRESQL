import { Router } from "express";
import {
  getUser,
  postUser,
  updateUser,
  deletUser,
} from "../controller/customer.controller.js";

const router = Router();

router.get("/user", getUser);
router.get("/newuser", postUser);
router.get("/updateuser", updateUser);
router.get("/deletuser", deletUser);

export default router;
