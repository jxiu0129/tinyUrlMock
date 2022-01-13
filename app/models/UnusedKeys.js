import mongoose, { Schema } from "mongoose";

const UnusedKeysSchema = new Schema({
    uniqueKey: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (str) => {
                return /[a-zA-Z0-9]{6}/.test(str);
            },
            message: (props) => `${props.value} is not a valid key`,
        },
    },
});

UnusedKeysSchema.set("collection", "UnusedKeys");

export default mongoose.model("UnusedKeys", UnusedKeysSchema);
