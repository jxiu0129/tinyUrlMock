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
            console.error("move_a_key_to_used");
            reject(error);
        } finally {
            session.endSession();
        }
    });
};

export const delete_one_UsedKey = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UsedKeys.findOneAndRemove({ uniqueKey });
            resolve(response);
        } catch (error) {
            console.error("delete_one_UsedKey");
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
            console.error("insert_UnusedKeys");
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
            console.error("search_one_from_UnusedKeys");
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
            console.error("search_all_from_UnusedKeys");
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
            console.error("search_all_from_UsedKeys");
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
            console.error("delete_all_from_both_Keydbs");
            reject(error);
        }
    });
};
export const search_unusedKey_by_key = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await UnusedKeys.find({ uniqueKey });
            resolve(res);
        } catch (error) {
            console.error("search_unusedKey_by_key");
            reject(error);
        }
    });
};
export const search_usedKey_by_key = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await UsedKeys.find({ uniqueKey });
            resolve(res);
        } catch (error) {
            console.error("search_usedKey_by_key");
            reject(error);
        }
    });
};
