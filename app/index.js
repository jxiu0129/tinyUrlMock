import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./config";

dotenv.config();
const app = express();

// connnect to mongodb
connectDB().then(() => {
    // schedule here
    // start();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port " + process.env.PORT);
});
