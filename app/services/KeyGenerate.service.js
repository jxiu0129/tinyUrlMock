import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import {
    search_all_from_UnusedKeys,
    search_all_from_UsedKeys,
    insert_UnusedKeys,
    search_one_from_UnusedKeys,
    move_a_key_to_used,
    delete_one_UsedKey,
    // delete_all_from_both_Keydbs,
} from "../dao/KGS.dao";

import { delete_by_shortenUrl } from "../dao/url.dao";

// create new keys and insert into db
const createNewKeys = () => {
    return new Promise(async (resolve, reject) => {
        // 清資料用
        // delete_all_from_both_Keydbs()
        //     .then(() => console.log("delete success"))
        //     .catch((err) => console.error(err));
        // return resolve();
        try {
            const alphabet =
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const nanoid = customAlphabet(alphabet, 6);

            // 先從usedkeys & unusedkeys db找出已經有的keys，以檢查新增的keys是否已新增過
            const allUnusedKeys = await search_all_from_UnusedKeys();
            const allUsedKeys = await search_all_from_UsedKeys();
            const allKeys = [...allUnusedKeys, ...allUsedKeys];
            const keyChecker = {};
            for (let i of allKeys) {
                keyChecker[i.uniqueKey] = 1;
            }

            // 用set避免新增重複的key
            const nonDuplicateKeys = new Set();
            let numChecker = 0;
            for (let i = 0; i < 50; i++) {
                let newKey = nanoid();
                if (!keyChecker[newKey]) {
                    nonDuplicateKeys.add(nanoid());
                    numChecker++;
                }
            }
            if (numChecker !== 50) {
                console.log("nanoID duplicated, insert less than 50");
            }

            const finalKeys = [];
            for (let i of [...nonDuplicateKeys]) {
                finalKeys.push({ uniqueKey: i });
            }
            const response = await insert_UnusedKeys(finalKeys);
            resolve(response);
        } catch (error) {
            console.error("createNewKeys");
            reject(error);
        }
    });
};

// move usedKeys to usedKeys db
const setKeysUsed = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { uniqueKey } = await search_one_from_UnusedKeys();
            await move_a_key_to_used(uniqueKey);
            resolve(uniqueKey);
        } catch (error) {
            console.error("setKeysUsed");
            reject(error);
        }
    });
};

// move unused keys to unusedKeys db
const setKeysUnused = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            await delete_one_UsedKey(uniqueKey);
            await insert_UnusedKeys([{ uniqueKey }]);
            resolve();
        } catch (error) {
            console.error("setKeysUnused");
            reject(error);
        }
    });
};

const url_expired = (shortenUrl) => {
    return new Promise(async (resolve, reject) => {
        // const session = await mongoose
        //     .startSession()
        //     .catch((err) =>
        //         console.error("url_expired (mongoose session)", err)
        //     );
        try {
            // 從Url刪掉過期的，然後setKeyUnused

            // session.startTransaction();
            await delete_by_shortenUrl(shortenUrl);
            await setKeysUnused(shortenUrl);
            // await session.commitTransaction();
            resolve();
        } catch (error) {
            console.error("url_expired");
            reject(error);
        } finally {
            // session.endSession();
        }
    });
};

export default {
    createNewKeys,
    setKeysUsed,
    setKeysUnused,
    url_expired,
};
