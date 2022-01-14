import logic from "../logic/admin.logic";
import { responseSuccess, responseErr } from "../utils";

const createNewKeys = (req, res, next) => {
    logic
        .createNewKeys()
        .then((result) => {
            responseSuccess(res, 200, "jxiu", result, "createNewKeys");
        })
        .catch((err) => {
            responseErr(res, 500, "jxiu", err, "createNewKeys");
        });
};

export default {
    createNewKeys,
};
