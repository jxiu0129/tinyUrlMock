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
