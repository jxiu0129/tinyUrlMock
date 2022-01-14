import express from "express";
// import sample from "./sample.route";
import url from "../controllers/url.controller";

const router = express.Router();
// router.use("/Sample", sample);

router.route("/").get(url.createTinyUrl);

export default router;
