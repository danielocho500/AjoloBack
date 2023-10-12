const responseServerError = (res) => res.status(500).json({
    status: 'error',
    msg: 'internal server error',
    data: {}
});

module.exports = {
    responseServerError,
};