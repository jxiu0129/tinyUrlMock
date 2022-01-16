import { customAlphabet } from "nanoid";

import {
    search_all_from_UnusedKeys,
    search_all_from_UsedKeys,
    insert_many_UnusedKeys,
    search_one_from_UnusedKeys,
    move_a_key_to_used,
    delete_one_UsedKey,
} from "../dao/KGS.dao";

// create new keys and insert into db
const createNewKeys = () => {
    return new Promise(async (resolve, reject) => {
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
            const response = await insert_many_UnusedKeys(finalKeys);
            resolve(response);
        } catch (error) {
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
            reject(error);
        }
    });
};

// move unused keys to unusedKeys db
const setKeysUnused = (uniqueKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            await delete_one_UsedKey(uniqueKey);
            await insert_many_UnusedKeys([{ uniqueKey }]);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createNewKeys,
    setKeysUsed,
    setKeysUnused,
};
