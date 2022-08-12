function isValid(loginCredentials) {
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
            if (loginCredentials.password?.trim() && loginCredentials.password.length < 8)
                error.push("password must have atleast 8 characters");
            else if (!(/[^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}]/.test(loginCredentials.password) && /[A-Z]/.test(loginCredentials.password[0]))) {
                error.push("password should start with a Capital letter and must have atleast one small letter a number and a special character.")
            }
        }
        return error;
    } catch (err) {
        console.log(err.message);
    }
}

function isInvalid(data, getEmail, getPhone, userName) {
    try {
        const isValid = (value) => {
            if (typeof value === 'undefined' || value === null) return false
            if (typeof value === 'string' && value.trim().length === 0) return false
            return true
        }
        let error = []
        //checks if user has given any data
        if (Object.keys(data).length == 0)
            return ["Please enter data to user registration"]

        //checks if fname is present
        if (!isValid(data.name))
            error.push("name is required")

        //check if email is present
        if (!isValid(data.email_id))
            error.push("email_id is required")

        //checks if phone is present or not
        if (!isValid(data.mobile_no))
            error.push("phone number is required")

        //check if password is present
        if (!isValid(data.password))
            error.push("password is required")

        if (!isValid(loginCredentials.password)) {
            error.push("Password is required.");
        } else {
            if (loginCredentials.password?.trim() && loginCredentials.password.length < 8)
                error.push("password must have atleast 8 characters");
            else if (!(/[^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}]/.test(loginCredentials.password) && /[A-Z]/.test(loginCredentials.password[0]))) {
                error.push("password should start with a Capital letter and must have atleast one small letter a number and a special character.")
            }
        }

        //checks for valid fname
        if (typeof data.name == "string" && !(/^[a-zA-Z]+$/.test(data.fname?.trim())))
            error.push("enter a valid name")

        //validate email
        if (typeof data.email_id == "string" && !(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email?.trim())))
            error.push("enter a valid email")
        //check for duplicate email
        if (getEmail)
            error.push("email is already in use")

        //checks for valid phone number
        if (typeof data.mobile_no == "string" && !(/^((\+91)?0?)?[6-9]\d{9}$/.test(data.mobile_no.trim())))
            error.push("enter valid mobile number")

        if (typeof data.mobile_no == "string" && (/^((\+91)?0?)?[6-9]\d{9}$/.test(data.mobile_no.trim())))
            data.mobile_no = data.mobile_no.trim().slice(-10)

        //check unique phone number
        if (getPhone)
            error.push("mobile number is already in use")

        if (userName)
            error.push("User name has been taken")

        if (error.length > 0)
            return error
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = { isInvalid, isValid }
