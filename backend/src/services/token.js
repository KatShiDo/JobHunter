const jwt = require("jsonwebtoken");

const keys = require("@/config/keys");
const { refreshSecret, refreshLife, tokenLife, secret } = keys.jwt;

exports.generateRefreshToken = (userId, fingerprint) => {
  const payload = {
    id: userId,
    fingerprint: fingerprint,
  };

  return jwt.sign(payload, refreshSecret, { expiresIn: refreshLife });
};

exports.generateAccessToken = (userId) => {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, secret, {
    expiresIn: tokenLife,
  });
};
