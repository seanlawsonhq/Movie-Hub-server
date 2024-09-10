const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");


// vvv=========The FUNCTION===================
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //===vvv Conditions=================
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(customError("No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  //vvv====try and catch==============
  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRETS);
    console.log(payLoad);
    req.user = { userId: payLoad.userId };
    console.log(req.user);
    
    
    next();
  } catch (error) {
    return next(customError("Unauthorized", 401));
  }
};
// ====Export=========
module.exports = auth;