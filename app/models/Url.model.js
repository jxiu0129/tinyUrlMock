import mongoose, { Schema } from "mongoose";

const UrlSchema = new Schema({
    shortenUrl: { type: String, required: true, unique: true },
    OriginalUrl: { type: String, required: true, unique: true },
    createDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
});

UrlSchema.set("collection", "Url");

export default mongoose.model("Url", UrlSchema);
