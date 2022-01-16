import Url from "../models/Url.model";

export const find_exist_url = (url) => {
    const { shortenUrl, originalUrl } = url;
    return new Promise(async (resolve, reject) => {
        try {
            let response;
            if (originalUrl) {
                response = await Url.findOne({ originalUrl }).exec();
            } else {
                response = await Url.findOne({ shortenUrl }).exec();
            }
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const insert_newURL = (originalUrl, shortenUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            const insertObj = {
                shortenUrl,
                originalUrl,
                createDate: Date.now(),
            };
            const response = await Url.insertMany([insertObj]);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const delete_by_shortenUrl = (shortenUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Url.findOneAndRemove({ shortenUrl });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
