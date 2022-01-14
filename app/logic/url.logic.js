// import { insert_many_UnusedKeys } from "../dao/KGS.dao";
const createTinyUrl = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // const test = [{ uniqueKey: "123453" }, { uniqueKey: "10dji1" }];
            // const t = await insert_many_UnusedKeys(test);
            // console.log(t);
            resolve("test route");
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createTinyUrl,
};
