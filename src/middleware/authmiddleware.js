const jwt = require("jsonwebtoken");
const redis = require("redis");
const client = redis.createClient();
require("dotenv").config();


// Access Token for less period of time
const AccessToken = (Payload, secret_Key) => {
  try {
    const token = jwt.sign(Payload, secret_Key, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error(error);
  }
};

// Refresh Token
const RefreshToken = (Payload, secret_Key) => {
  try {
    const refreshtoken = jwt.sign(Payload, secret_Key, { expiresIn: "7d" });
    return refreshtoken;
  } catch (error) {
    console.log(error);
  }
};

// Function to check if user is authenicated or not
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.secret_key, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired access token" });
    }

    req.user = decoded;
    next();
  });
};

// Function to Get the Token Data
const GetTokenData = async (token) => {
  try {
    const decoded = await jwt.verify(
      token,
      process.env.secret_key,
      (err, decoded) => {
        if (!err) {
          return decoded;
        }
      }
    );
    return decoded;
  } catch (error) {
    console.log(error);
  }
};


// Function to Check the Authorization
const authorizeRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; 

    if (!roles.includes(userRole)) {
      return sendErrorResponse(res, 403, 'Forbidden: You do not have the required permissions.');
    }

    next(); 
  };
};

module.exports = { AccessToken, RefreshToken, authenticate, GetTokenData, authorizeRole };
