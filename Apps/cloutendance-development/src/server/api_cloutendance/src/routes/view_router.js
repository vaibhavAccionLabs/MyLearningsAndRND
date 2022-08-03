/*=========================================================
 *  CLOUTENDANCE BACKEND: BACKEND UI INTERACTION ROUTES
 *  DEVELOPER: TERRENCE CALZADA (TEZADA)
 *  COMPANY: PYRITECREW.CO
 *  DATE: NOVEMBER 3, 2021
 * =========================================================
 */
const express = require("express");
const router = express.Router();

router.get("/", (req, view) => view.render("index"));
router.get("/error", (req, view) => view.render("error"));

module.exports = router;
