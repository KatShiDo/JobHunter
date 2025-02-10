const passport = require("passport");
const JWTokenStrategy = require("passport-jwt").Strategy;
const YandexStratergy = require("passport-yandex").Strategy;
const VkStrategy = require("passport-vkontakte").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const keys = require("./keys");
const mailer = require("@/services/mailer");

const { yandex, vkontakte } = keys;

const User = mongoose.model("User");
const secret = keys.jwt.secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
  new JWTokenStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  }),
);

const yandexAuth = async () => {
  try {
    passport.use(
      new YandexStratergy(
        yandex,
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value || null;

            let user = null;

            if (email) {
              user = await User.findOne({ email });
            }

            if (!user) {
              user = await User.findOne({ yandexId: profile.id });
            }

            if (user) {
              if (!user.yandexId?.includes(profile.id)) {
                user.yandexId = profile.id;
                user.confirmed = true;
                await user.save();
              }
              return done(null, user);
            }

            const password = crypto
              .randomBytes(10)
              .toString("base64")
              .slice(0, 10)
              .replace(/\+/g, "A")
              .replace(/\//g, "B");

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new User({
              yandexId: profile.id,
              email: email,
              firstName: profile.name.familyName || "Unknown",
              lastName: profile.name.givenName || "User",
              password: hash,
              confirmed: true,
            });

            newUser.save();

            if (email) {
              await mailer.sendEmail(email, "signup-provider", {
                password: password,
                language: "ru",
              });
            }

            return done(null, newUser);
          } catch (error) {
            console.log(error);
          }
        },
      ),
    );
  } catch (error) {
    console.log("error");
  }
};

const vkontakteAuth = async () => {
  try {
    passport.use(
      new VkStrategy(
        vkontakte,
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value || null;

            let user = null;

            if (email) {
              user = await User.findOne({ email });
            }

            if (!user) {
              user = await User.findOne({ vkontakteId: profile.id });
            }

            if (user) {
              if (!user.vkontakteId?.includes(profile.id)) {
                user.vkontakteId = profile.id;
                user.confirmed = true;
                await user.save();
              }
              return done(null, user);
            }

            const password = crypto
              .randomBytes(10)
              .toString("base64")
              .slice(0, 10)
              .replace(/\+/g, "A")
              .replace(/\//g, "B");

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new User({
              vkontakteId: profile.id,
              email: email,
              firstName: profile.name.familyName || "Unknown",
              lastName: profile.name.givenName || "User",
              password: hash,
              confirmed: true,
            });

            newUser.save();

            if (email) {
              await mailer.sendEmail(email, "signup-provider", {
                password: password,
                language: "ru",
              });
            }

            return done(null, newUser);
          } catch (error) {
            console.log(error);
          }
        },
      ),
    );
  } catch (error) {
    console.log("error");
  }
};

module.exports = async (app) => {
  app.use(passport.initialize());
  await yandexAuth();
  await vkontakteAuth();
};
