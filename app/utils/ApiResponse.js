//prettier-ignore
/**
 * 標準統一回傳成功
 * @param {*} res
 * @param {*} statusCode
 * @param {*} user
 * @param {*} objMsg
 * @param {*} functionName
 */
export const responseSuccess = (res, statusCode = 200, user = 'system', objMsg, functionName = 'system') => {
    try {
        //// res.status(statusCode).json(new SuccessResponseModel(message, !objMsg || (isCamel ? camelcaseKeys(objMsg) : objMsg)));
        // let reMsg = `response_success: ${JSON.stringify({ statusCode, user, objMsg, functionName })}`;
        const obj = {
            status: statusCode,
            message: `${functionName} success`,
            data : objMsg,
            time_tw: new Date()
        };
        res.status(statusCode).json(obj);
    } catch (error) {
        console.error(error)
    }
};

//prettier-ignore
/**
 * 標準統一回傳錯誤
 * @param {*} res
 * @param {*} errObj
 * @param {*} functionName
 */
export const responseErr = (res, statusCode = 400, user = 'system', errObj, functionName = 'system') => {
    try {
        statusCode = errObj.status ? errObj.status : statusCode;
        //// var message = errObj.message ? errObj.message : errObj;
        //// LogService.createErrLog(res.req, errObj);
        const obj = {
            status: statusCode,
            message: `${functionName} fail`,
            error : errObj.message,
            time_tw: new Date()
        };
        res.status(statusCode).json(obj);
    } catch (error) {
        console.error(error);
    }
};

/**
 * 統一錯誤物件組成, msg: 純文字, 有任何物件放到 obj
 * @param {*} msg
 * @param {*} code
 * @param {*} fName
 * @param {*} obj
 */
export const errObj = (msg, code = 400, fName = "unknow", obj) => {
    try {
        msg = typeof msg === "string" ? msg : JSON.stringify(msg);
        return Object.assign({}, { fName, code, msg, obj });
    } catch (error) {
        console.log(error);
    }
};
