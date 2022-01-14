import UsedKeys from "../models/UsedKeys.model";
import UnusedKeys from "../models/UnusedKeys.model";

export const insert_many_UnusedKeys = (keysArr) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UnusedKeys.insertMany(keysArr);
            console.log("success insert to unusedkeys", response);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const search_all_from_UnusedKeys = () => {
    return new Promise(async (resolve, reject) => {
        await UnusedKeys.find({}).exec((err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

export const search_all_from_UsedKeys = () => {
    return new Promise(async (resolve, reject) => {
        await UsedKeys.find({}).exec((err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};
