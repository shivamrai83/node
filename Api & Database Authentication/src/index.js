
const express = require("express");
const passport = require("passport");
const movieController = require("./controller/movie");
const userController = require("./controller/user");
const authController = require("./controller/auth");
const db = require("./db/index");
const { SIGNING_KEY, sanitizeUser } = require("./utility");

const JwtStrategy = require("passport-jwt").Strategy, //!!! JWT is implemented in Passport by Strategy pattern,!!! so it means that you can swap the authentication mechanism without affecting other parts of your application.
  ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SIGNING_KEY;

const PORT = 3100;
const app = express();

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const user = await db.sequelize.models.users.findOne({ id: payload.id });

    if (!user) {
      done(null, false);
    }

    done(null, sanitizeUser(user));
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());

movieController.Init(app);
userController.Init(app);
authController.Init(app);

db.init().then(console.log).catch(console.log);

app.listen(PORT, function () {
  console.log(`Your app is running on PORT - ${PORT}`);
});
