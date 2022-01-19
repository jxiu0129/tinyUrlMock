import express from "express";
import bodyparser from "body-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { connectDB } from "./config";
import routes from "./routes";

dotenv.config();
const app = express();

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: process.env.RATE_LIMIT_MAX,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "您於短時間內呼叫太多次，請於15分鐘後重新嘗試",
});

app.use(limiter);

app.use(
    "/",
    (req, res, next) => {
        // can do validation here e.g. jwt
        next();
    },
    routes
);
app.get("*", (_, res) => res.status(404).send("Not Found"));
// connnect to mongodb
connectDB()
    .then(() => {
        // schedule here
        // start();
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port " + process.env.PORT);
});
