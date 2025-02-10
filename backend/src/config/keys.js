module.exports = {
  app: {
    apiURL: process.env.BASE_API_URL,
    clientURL: process.env.CLIENT_URL,
    email: process.env.EMAIL,
  },
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URI,
  },
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
    sender: process.env.NODEMAILER_SENDER,
    from: process.env.NODEMAILER_FROM,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: process.env.JWT_TOKEN_LIFE,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshLife: process.env.JWT_REFRESH_LIFE,
  },
  yandex: {
    clientID: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
    callbackURL: process.env.YANDEX_CALLBACK_URL,
  },
  vkontakte: {
    clientID: process.env.VKONTAKTE_CLIENT_ID,
    clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
    callbackURL: process.env.VKONTAKTE_CALLBACK_URL,
    scope: ["email"],
    lang: "ru",
  },
};
