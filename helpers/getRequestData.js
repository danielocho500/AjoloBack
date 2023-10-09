const getRequestData = (req) => {
    const userAgent = req.headers['user-agent'];
    const userIp = req.connection.remoteAddress;

    return { userAgent, userIp };
};

module.exports = {
    getRequestData,
};