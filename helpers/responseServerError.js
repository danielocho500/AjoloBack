const responseServerError = (res) => res.status(500).json({
    status: 'errir',
    msg: 'internal server error',
    data: {}
});

module.exports = {
    responseServerError,
};