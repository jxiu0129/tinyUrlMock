import logic from "../logic/url.logic";
import { responseSuccess, responseErr } from "../utils";

const createTinyUrl = (req, res, next) => {
    const { url } = req.body;
    logic
        .createTinyUrl(url)
        .then((result) => {
            responseSuccess(res, 200, "jxiu", result, "createTinyUrl");
        })
        .catch((err) => {
            console.error(err);
            responseErr(res, 500, "jxiu", err, "createTinyUrl");
        });
};

export default {
    createTinyUrl,
};
