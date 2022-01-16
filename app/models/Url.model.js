import mongoose, { Schema } from "mongoose";

const UrlSchema = new Schema({
    shortenUrl: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true, unique: true },
    createDate: { type: Date, required: true },
    // duration: { type: Number, required: true }, 如果需要自訂過期時間才需要
});

UrlSchema.set("collection", "Url");

export default mongoose.model("Url", UrlSchema);
