const userModel = require('../../model/userModel');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

async function isValid(loginCredentials) {
    try {
        const isValidField = (value) => {
            if (typeof value === 'undefined' || value === null) return false
            if (typeof value === 'string' && value.trim().length === 0) return false
            return true
        }
        let error = [];
        if (!isValidField(loginCredentials.user_name)) {
            error.push("User name is required.");
        } else if (typeof data.fname === "string" && !(/^[a-zA-Z]+$/.test(loginCredentials.user_name?.trim()))) {
            error.push("enter a valid user name");
        }
        if (!isValidField(loginCredentials.password)) {
            error.push("Password is required.");
        } else {
            if (loginCredentials.password?.trim() && loginCredentials.password?.trim().length < 8)
                error.push("password must have atleast 8 characters");
            else if (!(passwordRegex.test(loginCredentials.password) && /[A-Z]/.test(loginCredentials.password[0]))) {
                error.push("password should start with a Capital letter and must have atleast one small letter a number and a special character.")
            }
        }
        return error;
    } catch (err) {
        console.log(err.message);
    }
}

async function isRequired(data) {
    try {
        const isValid = (value) => {
            if (typeof value === 'undefined' || value === null) return false;
            if (typeof value === 'string' && value.trim().length === 0) return false;
            return true;
        }
        let errors = [];
        //checks if user has given any data
        if (Object.keys(data).length === 0)
            return ["Please enter data for user registration"];

        //checks if fname is present
        if (!isValid(data.name))
            errors.push("name is required");

        //check if email is present
        if (!isValid(data.email_id))
            errors.push("email_id is required");

        //checks if phone is present or not
        if (!isValid(data.mobile))
            errors.push("mobile is required");

        if (!isValid(data.user_name))
            errors.push("user_name is required");

        //check if password is present
        if (!isValid(data.password)) {
            errors.push("password is required.");
        }
        return errors;
    } catch (err) {
        console.log(err.message);
    }
}

async function isInvalid(data) {
    try {
        const isValid = (value) => {
            if (typeof value === 'undefined' || value === null) return false;
            if (typeof value === 'string' && value.trim().length === 0) return false;
            return true;
        }
        let error = [];

        if (isValid(data.password)) {
            if (data.password?.trim() && data.password?.trim().length < 8)
                error.push("password must have atleast 8 characters");
            else if (!(passwordRegex.test(data.password) && (/[A-Z]/).test(data.password[0]))) {
                error.push("password should start with a Capital letter and must have atleast one small letter a number and a special character.")
            }
        }

        if (typeof data.user_name === "string" && !(/^[\w]+$/.test(data.user_name?.trim())))
            error.push("enter a valid user_name");

        else {
            const userNameAlreadyExists = await userModel.findOne({ user_name: data.user_name });
            if (userNameAlreadyExists) error.push("user_name is already in use");
        }

        //checks for valid fname
        if (typeof data.name === "string" && !(/^[a-zA-Z]+$/.test(data.fname?.trim())))
            error.push("enter a valid name");

        //validate email
        if (typeof data.email_id === "string" && !(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email_id?.trim())))
            error.push("enter a valid email_id");
        //check for duplicate email
        else {
            const emailAlreadyExists = await userModel.findOne({ email_id: data.email_id });
            if (emailAlreadyExists) error.push("email_id is already in use");
        }

        //checks for valid phone number
        if (typeof data.mobile === "string" && !(/^((\+91)?0?)?[6-9]\d{9}$/.test(data.mobile.trim())))
            error.push("enter a valid mobile number");

        if (typeof data.mobile === "string" && (/^((\+91)?0?)?[6-9]\d{9}$/.test(data.mobile.trim())))
            data.mobile = data.mobile.trim().slice(-10);

        //check unique phone number
        else {
            const phoneAlreadyExists = await userModel.findOne({ mobile: data.mobile });
            if (phoneAlreadyExists) error.push("mobile number is already in use");
        }

        return error;
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = { isRequired, isInvalid, isValid }
