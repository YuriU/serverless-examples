module.exports.test = async (request, response, next) => {
    request.user = {
        uid: '1'
    }
    next();
}