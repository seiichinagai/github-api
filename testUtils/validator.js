const isApiGatewayResponse = response => {
    const { body, headers, statusCode } = response;

    if (!body || !headers || !statusCode) return false;
    if (typeof statusCode !== 'number') return false;
    if (typeof body !== 'string') return false;

    return true;
};

module.exports = {
    isApiGatewayResponse
};