const { verify } = require('jsonwebtoken');
const { verifyAsync } = require('util').promisify(verify);
// const post = require('../../model/postModel');
// const user = require('../../model/userModel');

const authentication = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key'];
        const verifiedToken = await verifyAsync(token, process.env.SECRET_KEY);
        req.user_id = verifiedToken.user_id;
        next();

    } catch (err) {
        return res
            .status(401)
            .send({ 
                status: false, 
                message: err.message 
            });
    }
};

const authorization = async function(req, res, next) {
    try {
        if(req.user_id === req.params.userId) next();
        return res
            .status(403)
            .send({
                status: false,
                message: "Unauthorized Access / Access Denied"
            })

    } catch (err) {
        return res
            .status(500)
            .send({ 
                status: false, 
                message: err.message 
            });
    }
}

module.exports = { authentication, authorization };