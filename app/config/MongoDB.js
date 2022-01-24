import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
            // 視需求加options
            // mongoose.connect(mongodb+srv://clusterAnything.mongodb.net/test?retryWrites=true&w=majority, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true })
            // user: process.env.MONGO_USER,
            // pass: process.env.MONGO_PWD,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`mongoDB connected on ${con.connection.host}`);
    } catch (err) {
        console.error("DB connection Error ==>", err);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
    } catch (err) {
        console.error("DB close connection Error ==>", err);
    }
};
