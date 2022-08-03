const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const requireAuth = (request, response, next) => {
  try {
    const token = request.cookies.key;
    console.log(token);
    if (token) {
      jwt.verify(
        token,
        process.env.APPLICATION_SIGNITURE,
        (err, decodedToken) => {
          console.log("Error");
          if (err) {
            console.log("error");
            throw new Error(err);
          } else {
            console.log("success");
            request.id = decodedToken.id;
            next();
          }
        }
      );
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return next();
  }
};

module.exports = { requireAuth };
