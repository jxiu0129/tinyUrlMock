import KGS from "../services/KeyGenerate.service";
import { delete_all_from_both_Keydbs } from "../dao/KGS.dao";
import { delete_all_Url } from "../dao/url.dao";
import { originalUrlRedis, shortenUrlRedis } from "../config";
const createNewKeys = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await KGS.createNewKeys();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

// claer all data in mongo
const clearAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await delete_all_from_both_Keydbs();
            console.log("delete keys success");
            await delete_all_Url();
            console.log("delete url success");
            await originalUrlRedis.flushdb();
            console.log("flush originalUrlRedis success");
            await shortenUrlRedis.flushdb();
            console.log("flush shortenUrlRedis success");

            return resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createNewKeys,
    clearAll,
};
