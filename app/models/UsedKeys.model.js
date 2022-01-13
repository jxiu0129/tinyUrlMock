import mongoose, { Schema } from "mongoose";

const UsedKeysSchema = new Schema({
    uniqueKey: { type: String, required: true, unique: true },
});

UsedKeysSchema.set("collection", "UsedKeys");

export default mongoose.model("UsedKeys", UsedKeysSchema);
