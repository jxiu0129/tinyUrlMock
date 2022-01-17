import mongoose from "mongoose";

import UsedKeys from "../models/UsedKeys.model";
import UnusedKeys from "../models/UnusedKeys.model";

export const move_a_key_to_used = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        const session = await mongoose.startSession();
        try {
            // 從unused取一個
            session.startTransaction();
            await UnusedKeys.findOneAndRemove(
                { uniqueKey },
                { session: session }
            );
            // 放進used
            const response = await UsedKeys.insertMany([{ uniqueKey }], {
                session: session,
            });
            await session.commitTransaction();
            resolve(response);
        } catch (error) {
            reject(error);
        } finally {
            session.endSession();
        }
    });
};

export const delete_one_UsedKey = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UsedKeys.findByIdAndRemove({ uniqueKey });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const insert_UnusedKeys = (keysArr) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UnusedKeys.insertMany(keysArr);
            console.log("success insert to unusedkeys");
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const search_one_from_UnusedKeys = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UnusedKeys.find({}).limit(1).exec();
            resolve(response[0]);
        } catch (error) {
            reject(error);
        }
    });
};

export const search_all_from_UnusedKeys = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UnusedKeys.find({}).exec();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const search_all_from_UsedKeys = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UsedKeys.find({}).exec();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const delete_all_from_both_Keydbs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await UsedKeys.deleteMany({});
            await UnusedKeys.deleteMany({});
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};
