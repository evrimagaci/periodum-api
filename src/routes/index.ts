import * as express from "express";
import testRouter from "./test";

const router = express.Router();

// Add future routers below.
router.use('/test', testRouter);

export default router;
