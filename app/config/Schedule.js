import schedule from "node-schedule";
// import mongoose from "mongoose";

import { insert } from "../dao/weather.dao";
// import weather from "../models/Weather.model";

export const start = async () => {
    const session = await mongoose.startSession();
    try {
        // 清資料用
        // await weather.deleteMany({}, () => console.log("success delete all"));

        // 每小時的第五分鐘會執行 ex: 12:05, 16:05
        // 氣象api每10分鐘更新一次，五分會取得整點的
        schedule.scheduleJob("5 * * * *", async () => {
            console.log(`schedule exec on ${new Date()}`);
            const weatherData = await get(
                `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001`,
                null,
                { Authorization: process.env.WEATHER_TOKEN }
            );

            const { location } = weatherData.records;
            const legalLocation = ["臺北市", "桃園市", "新北市"];

            session.startTransaction();
            for (let l of location) {
                if (legalLocation.includes(l.parameter[0].parameterValue)) {
                    const weatherElement = {};
                    l.weatherElement.map((e) => {
                        if (e.elementName !== "24R") {
                            weatherElement[e.elementName] = e.elementValue;
                        }
                        weatherElement["TWENTYFOUR_R"] = e.elementValue;
                    });

                    const insertData = {
                        locationName: l.locationName,
                        stationID: l.stationId,
                        obsTime: l.time.obsTime,
                        weatherElement,
                        obsLocation: {
                            city: l.parameter[0].parameterValue,
                            city_id: l.parameter[1].parameterValue,
                            town: l.parameter[2].parameterValue,
                            town_id: l.parameter[3].parameterValue,
                        },
                    };
                    const test = await insert(insertData);
                }
                continue;
            }
            await session.commitTransaction();
        });
    } catch (err) {
        console.error("Error in schedule start", err);
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
};
