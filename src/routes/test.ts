import * as express from "express";
import {testController} from "../controllers/testController";

const router = express.Router();

router.get('/handled', testController.ThrowHandledException);
router.get('/unhandled', testController.ThrowUnHandledException);

export default router;
