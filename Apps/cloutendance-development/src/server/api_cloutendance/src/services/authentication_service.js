/*=========================================================
 *  CLOUTENDANCE BACKEND: AUTHENTICATION SERVICE LOGIC
 *  DEVELOPER: TERRENCE CALZADA (TEZADA)
 *  COMPANY: PYRITECREW.CO
 *  DATE: NOVEMBER 3, 2021
 * =========================================================
 */

const jwt = require("jsonwebtoken");
const { AGE_OF_TOKEN } = require("../helpers/constant_container");
const User = require("../models/user_model");
const dotenv = require("dotenv");

/**
 * A method that authenticate user and return a generated jwt token and user information
 * @param {Object} parameter client request.body credentials
 */
const authenticate = async (parameter) => {
  try {
    const findUser = await User.findOne({ usr_email: parameter.email });
    if (findUser) {
      if (await findUser.validatePassword(parameter.password)) {
        const token = await _generateToken(findUser.id);
        return {
          id: findUser.id,
          email: findUser.usr_email,
          token: token,
        };
      }
    }
    throw new Error("Your email or password did not macth");
  } catch (err) {
    throw err;
  }
};

/**
 * A method that creates a new user
 * @param {Object} parameter client request.body credentials
 */
const create = async (parameter) => {
  try {
    if (await User.findOne({ usr_email: parameter.email })) {
      throw new Error(
        "User validation failed: usr_email: Email already exists"
      );
    }
    await new User({
      usr_email: parameter.email,
      usr_password: parameter.password,
    }).save();
  } catch (error) {
    throw error;
  }
};

const update = async (parameter) => {};

const remove = async (parameter) => {};

/**
 * A method that gets a user credentials or information by id
 * @param {String} parameter user id
 * @returns user credentials/information
 */
const user = async (parameter) => {
  try {
    const user = await User.findById(parameter);
    return { email: user.usr_email, role: user.usr_role };
  } catch (error) {
    throw error;
  }
};

module.exports = { authenticate, create, update, remove, user };

//PRIVATE METHODS
/**
 * A method that generate jwt token
 * @param {Object} id an object that contains username id
 * @returns a jwt token base on the user id, app signiture and headers
 */
const _generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.APPLICATION_SIGNITURE, {
    expiresIn: AGE_OF_TOKEN,
  });
};
