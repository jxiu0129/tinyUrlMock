const createTinyUrl = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve("test route");
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    createTinyUrl,
};
