export const prefixChecker = (str) => {
    // switch(str.startsWith())
    if (str.startsWith("https://")) {
        return str.slice(8);
    }
    // todo -> 是否需要判斷網址是http or https?
    // if(str.startsWith('http://')){
    //     return str.slice(6)
    // }
    return str;
};

export const urlExpiryChecker = (createDate) => {
    const EXPIRED_DURATION = parseInt(process.env.EXPIRED_DURATION);
    if (typeof createDate === "string") {
        createDate = Date.parse(createDate);
    }
    if (Date.now() - createDate > EXPIRED_DURATION) {
        return true;
    }
    return false;
};
