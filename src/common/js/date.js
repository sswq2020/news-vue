export const formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

let padLeftZero = (str) => {
    return ('00' + str).substr(str.length);
}

export const publishDate = (date) => {
    let fmt = '';
    // 将字符串转换成时间格式
    let timePublish = new Date(date);
    let timeNow = new Date();
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let year = month * 12;
    let diffValue = timeNow - timePublish;
    let diffYear = diffValue / year;
    let diffMonth = diffValue / month;
    let diffWeek = diffValue / (7 * day);
    let diffDay = diffValue / day;
    let diffHour = diffValue / hour;
    let diffMinute = diffValue / minute;
    if (diffYear > 1) {
        fmt = `${parseInt(diffYear)}年前`
    } else if (diffMonth > 1) {
        fmt = `${parseInt(diffMonth)}月前`
    } else if (diffWeek > 1) {
        fmt = `${parseInt(diffWeek)}周前`
    } else if (diffDay > 1) {
        fmt = `${parseInt(diffDay)}天前`
    } else if (diffHour > 1) {
        fmt = `${parseInt(diffHour)}小时前`
    } else if (diffMinute > 1) {
        fmt = `${parseInt(diffMinute)}分钟前`
    } else {
        fmt = '刚刚发表'
    }
    return fmt;
}