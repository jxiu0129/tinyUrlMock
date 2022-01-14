import logic from "../logic/url.logic";
import { responseSuccess, responseErr } from "../utils";

const createTinyUrl = (req, res, next) => {
    logic
        .createTinyUrl(req.body)
        .then((result) => {
            responseSuccess(res, 200, "jxiu", result, "createTinyUrl");
        })
        .catch((err) => {
            responseErr(res, 500, "jxiu", err, "createTinyUrl");
        });
};

export default {
    createTinyUrl,
};
