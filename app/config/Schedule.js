import schedule from "node-schedule";
// import mongoose from "mongoose";

import { insert } from "../dao/weather.dao";

export const start = async () => {
    const session = await mongoose.startSession();
    try {
        // 清資料用
        // await weather.deleteMany({}, () => console.log("success delete all"));

        // 每小時的第五分鐘會執行 ex: 12:05, 16:05
        // 氣象api每10分鐘更新一次，五分會取得整點的
        schedule.scheduleJob("5 * * * *", async () => {
            console.log(`schedule exec on ${new Date()}`);

            session.startTransaction();
            // do sth
            await session.commitTransaction();
        });
    } catch (err) {
        console.error("Error in schedule start", err);
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
};
