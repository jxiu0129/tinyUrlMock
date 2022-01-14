import KGS from "../services/KeyGenerate.service";
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

export default {
    createNewKeys,
};
