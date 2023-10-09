const responseMsg = (res, code, status, msg, data) => res.status(code).json({
    status,
    msg,
    data,
});

module.exports = {
    responseMsg,
};