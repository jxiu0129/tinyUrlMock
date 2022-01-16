import express from "express";
import bodyparser from "body-parser";

import dotenv from "dotenv";
import { connectDB } from "./config";
import routes from "./routes";

dotenv.config();
const app = express();

// app.get("/from", (req, res) => {
//     // 301會影響原網站的seo
//     res.redirect(302, "/to");
// });

// app.get("/to", (req, res) => {
//     res.send("success redirect");
// });

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false }));

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
connectDB().then(() => {
    // schedule here
    // start();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port " + process.env.PORT);
});
