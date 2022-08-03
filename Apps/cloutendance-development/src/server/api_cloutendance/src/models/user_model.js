/*=========================================================
*  CLOUTENDANCE BACKEND: USER SCHEMA-MODEL
*  DEVELOPER: TERRENCE CALZADA (TEZADA)
*  COMPANY: PYRITECREW.CO
*  DATE: NOVEMBER 3, 2021
* =========================================================
*/
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { isValidPassword } = require('mongoose-custom-validators');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    usr_email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already Exists"],
        maxlength: [150, "Email should be 150 characters long"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    usr_password: {
        type: String,
        required: [true, "Password is required"],
        validate: [isValidPassword, "Password should contain 1 uppercase, 1 number, 1 special character, and a minimum of 10 characters"]
    },
    usr_role: {
        type: String,
        required: [true, "Role is required"],
        default: "employee"
    }
}, { timestamps: true });

/**
 * A method to encrypt user input password before saving to database
 */
userSchema.pre('save', async function save(next) {
    if (!this.isModified('usr_password')) return next();
    try {
        this.usr_password = await bcrypt.hashSync(this.usr_password, await bcrypt.genSalt(10));
        return next();
    } catch (err) { 
        return next(err); 
    }
});

/**
 * A method to compare two incrypted string
 * @param {String} data password from user's request body
 * @returns a boolean when both encrypted text matched
 */
userSchema.methods.validatePassword = async function validatePassword(data) {
    return await bcrypt.compare(data, this.usr_password).catch(err => { throw err; });
};

module.exports = mongoose.model("User", userSchema);
