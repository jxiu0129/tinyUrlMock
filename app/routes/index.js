import express from "express";
// import sample from "./sample.route";
import url from "../controllers/url.controller";
import admin from "../controllers/admin.controller";

const router = express.Router();
// router.use("/Sample", sample);

// router.route("/").get(url.createTinyUrl);

router.route("/createTinyUrl").post(url.createTinyUrl);

router.route("/admin").get(admin.createNewKeys);

export default router;
