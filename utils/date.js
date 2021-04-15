exports.getFormattedTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    return year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;
}