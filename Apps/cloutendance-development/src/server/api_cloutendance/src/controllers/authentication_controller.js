/**
 * =========================================================
 *  CLOUTENDANCE BACKEND: AUTHENTICATION CONTROLLER
 *  DEVELOPER: TERRENCE CALZADA (TEZADA)
 *  COMPANY: PYRITECREW.CO
 *  DATE: NOVEMBER 3, 2021
 * =========================================================
 */
const { AGE_OF_TOKEN } = require("../helpers/constant_container");
const AuthService = require("../services/authentication_service");

/**
 * A method for controlling the route and Authentication Service create user method
 */
exports.registerUser = async (request, response, next) => {
  AuthService.create(request.body)
    .then(() =>
      response.status(200).json({ status: 200, message: "User is created" })
    )
    .catch((err) => next(err));
};

/**
 * Use for controlling the route and Authentication Service authenticate user method
 */
exports.loginUser = async (request, response, next) => {
  AuthService.authenticate(request.body)
    .then((res) => {
      response.cookie("key", res.token, {
        httpOnly: true,
        maxAge: AGE_OF_TOKEN * 1000,
      });
      response.status(200).json({ token: res.token });
    })
    .catch((err) => next(err));
};

exports.getUser = async (request, response, next) => {
  AuthService.user(request.id)
    .then((res) => {
      return response.status(200).json(res);
    })
    .catch((err) => next(err));
};
