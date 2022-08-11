const user = require('../model/userModel');
const { sign } = require('jsonwebtoken');
const { isRequired } = require('./validator/userValidations');

const register = async function (req, res) {
    try {
        const errors = isRequired(req.body);
        if (errors.length) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: 'Bad request',
                    error: errors
                });
        }
        const userData = {
            name: req.body.name,
            user_id: getNextId(),
            password: req.bod.password,
            email_id: req.body.email_id,
            user_name: req.body.user_name,
            gender: req.body.gender,
            mobile_no: req.body.mobile_no,
            isPublic: req.body.isPublic
        }
        const newUser = await user.create(userData);
        return res
            .status(201)
            .send({
                status: true,
                message: "User Created Successfully",
                data: newUser
            });


    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
};

const login = async function (req, res) {
    try {
        const loginCredentials = req.body;
        const errors = isValid(loginCredentials);
        if (errors.length) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: 'Bad request',
                    error: errors
                });
        }
        const { userId } = await user
            .findOne({
                user_name: loginCredentials.user_name,
                password: loginCredentials.password
            })
        const token = sign({ userId }, process.env.SECRET_KEY);
        return res
            .status(200)
            .send({
                status: true,
                message: "Login successful",
                data: token
            });
    } catch (err) {
        return res
            .status(500)
            .send({
                status: false,
                message: err.message
            });
    }
};

const editProfile = async function (req, res) {
    try {
        
    } catch (err) {
        return res
            .status(500)
            .send({ 
                status: false, 
                message: err.message 
            });
    }
};

const follow = async function(req, res) {
    try {

    } catch (err) {
        return res
            .status(500)
            .send({ 
                status: false, 
                message: err.message 
            });
    }
};

const block = async function(req, res) {
    try {

    } catch (err) {
        return res
            .status(500)
            .send({ 
                status: false, 
                message: err.message 
            });
    }
};

module.exports = { register, login, editProfile, follow, block };