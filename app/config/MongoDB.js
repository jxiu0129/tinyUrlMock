import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_ATLAS_URL, {
            // 視需求加options
        });
        console.log(`mongoDB connected on ${con.connection.host}`);
    } catch (err) {
        console.error("DB connection Error ==>", err);
    }
};
