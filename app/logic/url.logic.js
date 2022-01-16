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
            const isExist = await find_exist_url({ originalUrl: url });
            if (isExist) {
                const { shortenUrl, createDate } = isExist;
                const EXPIRED_DURATION = parseInt(process.env.EXPIRED_DURATION);
                if (Date.now() - createDate < EXPIRED_DURATION) {
                    console.log("from isExist");
                    const resObj = {
                        originalUrl: url,
                        shortenUrl: `localhost:${process.env.PORT}/${shortenUrl}`,
                    };
                    resolve(resObj);
                    return;
                } else {
                    // 已經過期的要處理
                    await KGS.url_expired(shortenUrl);
                }
            }
            // 2.新增一個tinyurl, (key DB)unused => used
            const uniqueKey = await KGS.setKeysUsed();
            const response = await insert_newURL(url, uniqueKey);
            const { shortenUrl, originalUrl } = response[0];

            resolve({
                originalUrl,
                shortenUrl: `localhost:${process.env.PORT}/${shortenUrl}`,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const redirectUrl = (url, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (url.length === 6) {
                const isExist = await find_exist_url({ shortenUrl: url });
                if (isExist) {
                    const { originalUrl, shortenUrl, createDate } = isExist;
                    const EXPIRED_DURATION = parseInt(
                        process.env.EXPIRED_DURATION
                    );
                    if (Date.now() - createDate < EXPIRED_DURATION) {
                        return res.redirect(302, `https://${originalUrl}`);
                    } else {
                        // 已經過期的要處理
                        await KGS.url_expired(shortenUrl);
                        return reject("shorten url expired");
                    }
                }
            }
            return next();
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createTinyUrl,
    redirectUrl,
};
