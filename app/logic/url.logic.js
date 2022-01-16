import {
    delete_by_shortenUrl,
    find_exist_url,
    insert_newURL,
} from "../dao/url.dao";
import KGS from "../services/KeyGenerate.service";
const createTinyUrl = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1.先找db有沒有一模一樣已經換過的，有的話直接回傳
            const isExist = await find_exist_url(url);
            if (isExist) {
                const { shortenUrl, createDate } = isExist;
                const ONE_YEAR = 60 * 60 * 24 * 365;
                if (Date.now() - createDate < ONE_YEAR) {
                    console.log("from isExist");
                    const resObj = {
                        originalUrl: url,
                        shortenUrl: `localhost:${process.env.PORT}/${shortenUrl}`,
                    };
                    resolve(resObj);
                }
                // 已經過期的要處理
                await delete_by_shortenUrl(shortenUrl);
                await KGS.setKeysUnused(shortenUrl);
            }
            // 2.新增一個tinyurl, (key DB)unused => used
            const uniqueKey = await KGS.setKeysUsed();
            const response = await insert_newURL(url, uniqueKey);
            const { shortenUrl, originalUrl } = response[0];

            resolve({
                originalUrl,
                shortenUrl: `localhost:${process.env.PORT}/${shortenUrl}`,
            });

            // resolve("test route");
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createTinyUrl,
};
