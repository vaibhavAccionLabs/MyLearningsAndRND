/*=========================================================
 *  CLOUTENDANCE BACKEND: API ROUTES/ENDPOINT
 *  DEVELOPER: TERRENCE CALZADA (TEZADA)
 *  COMPANY: PYRITECREW.CO
 *  DATE: NOVEMBER 3, 2021
 * =========================================================
 */
const express = require("express");
const authentication = require("../controllers/authentication_controller");
const { requireAuth } = require("../middleware/authentication_middlware");

const router = express.Router();

//AUTHENTICATION ENDPOINTS
router.route("/register").post(authentication.registerUser);
router.route("/login").post(authentication.loginUser);
router.route("/user").get(requireAuth, authentication.getUser);
//router.get('/user/:id', requireAuth, authentication.getUser);

module.exports = router;
