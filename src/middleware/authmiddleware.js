const jwt = require("jsonwebtoken");
const redis = require('redis');
const client = redis.createClient()

const GenerateToken = async (Payload, secret_Key) => {
  try {
    const token = jwt.sign(Payload, secret_Key, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error(error);
  }
};



module.exports = { GenerateToken }