import { find_exist_url, insert_newURL } from "../dao/url.dao";
import { prefixChecker, urlExpiryChecker as isExpired } from "../utils";
import KGS from "../services/KeyGenerate.service";
import { originalUrlRedis, shortenUrlRedis } from "../config";
const createTinyUrl = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            url = prefixChecker(url);
            // 0. 先從redis找
            const redisShortUrl = await shortenUrlRedis.get(url);
            if (redisShortUrl) {
                const [shortenUrl, createDate] = JSON.parse(redisShortUrl);
                if (isExpired(createDate)) {
                    // 已經過期的要處理
                    await KGS.url_expired(shortenUrl);
                    await shortenUrlRedis.del(url);
                    // return reject("shorten url expired");
                } else {
                    console.log("from redis");
                    const resObj = {
                        originalUrl: url,
                        shortenUrl: `localhost:${process.env.PORT}/${shortenUrl}`,
                    };
                    resolve(resObj);
                    return;
                }
            }
            // 1.找db有沒有一模一樣已經換過的，有的話直接回傳
            const isExist = await find_exist_url({ originalUrl: url });
            if (isExist) {
                const { shortenUrl, createDate } = isExist;
                if (isExpired(createDate)) {
                    // 已經過期的要處理
                    await KGS.url_expired(shortenUrl);
                    console.log("hi2");
                    // return reject("shorten url expired");
                } else {
                    console.log("from db");
                    await shortenUrlRedis.set(
                        url,
                        JSON.stringify([shortenUrl, createDate])
                    );
                    const resObj = {
                        originalUrl: url,
                        shortenUrl: `localhost:${process.env.PORT}/${shortenUrl}`,
                    };
                    resolve(resObj);
                    return;
                }
            }
            // 2.新增一個tinyurl, (key DB)unused => used
            const uniqueKey = await KGS.setKeysUsed();
            const response = await insert_newURL(url, uniqueKey);
            const { shortenUrl, originalUrl } = response[0];
            // await shortenUrlRedis.set(url, shortenUrl);  //? 新寫入有需要進redis?
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
                // 先從redis撈
                const redisOriginalUrl = await originalUrlRedis.get(url);
                if (redisOriginalUrl) {
                    const [originalUrl, createDate] =
                        JSON.parse(redisOriginalUrl);
                    if (isExpired(createDate)) {
                        // 已經過期的要處理
                        await KGS.url_expired(url);
                        await originalUrlRedis.del(url);
                        // return reject("shorten url expired"); -> 會丟回controller變500
                    } else {
                        // 301會影響原網站的seo
                        console.log("redirect from redis");
                        return res.redirect(302, `https://${originalUrl}`);
                    }
                }
                // redis沒有再從db
                const isExist = await find_exist_url({ shortenUrl: url });
                if (isExist) {
                    const { originalUrl, shortenUrl, createDate } = isExist;
                    originalUrlRedis.set(
                        url,
                        JSON.stringify([originalUrl, createDate])
                    );
                    if (isExpired(createDate)) {
                        // 已經過期的要處理
                        await KGS.url_expired(shortenUrl);
                        // return reject("shorten url expired"); -> 會丟回controller變500
                    } else {
                        // 301會影響原網站的seo
                        console.log("redirect from db");
                        return res.redirect(302, `https://${originalUrl}`);
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
