const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const MyDB = require("../db/myDB");
const path = require("path");
const bcrypt = require("bcrypt");

function MyAuth() {
  const myAuth = {};
  //Set up passport session

  myAuth.setupPassport = (app) => {
    passport.use(
      "local-signin",
      new Strategy(
        { passReqToCallback: true },
        async function (req, username, password, cb) {
          console.log("local signin...", username);
          try {
            const user = await MyDB.findByUsername(username);
            if (!user) {
              console.log("User not found");
              req.session.error = "user not found";
              return cb(null, user);
            }
            //check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(password, user.password);
            console.log("is it valid password?");
            if (!validPassword) {
              console.log("wrong password");
              req.session.error = "wrong password";
              return cb(null, user);
            }

            console.log("LOGGED IN AS: " + user.username);
            req.session.success =
              "You are successfully logged in " + user.username + "!";
            return cb(null, user);
          } catch (err) {
            console.log(err.body);
            return cb(err.body, user);
          }
        }
      )
    );

    passport.use(
      "local-signup",
      new Strategy(
        { passReqToCallback: true },
        async function (req, username, password, cb) {
          console.log("local signup...", username);
          //generate salt to hash password
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);

          try {
            const result = await MyDB.findByUsername(username);
            if (result) {
              console.log("COULD NOT REGISTER");
              req.session.error =
                "That username is already in use, please try a different one.";
              return cb(null, false);
            }
            const user = await MyDB.registerUser(username, password);
            if (user) {
              console.log("REGISTERED: " + user);
              req.session.success =
                "You are successfully registered and logged in " +
                user.username +
                "!";
              return cb(null, user);
            }
          } catch (err) {
            console.log(err.body);
            return cb(err.body, user);
          }
        }
      )
    );

    //Save username in the session
    passport.serializeUser(function (user, cb) {
      cb(null, user.username);
    });

    passport.deserializeUser(async (username, cb) => {
      try {
        const user = await MyDB.findByUsername(username);
        return cb(null, user);
      } catch (err) {
        console.log("Error deserializing");
        cb(err);
      }
    });
    // Initialize Passport and restore authentication state, if any, from the
    // session
    app.use(
      require("express-session")({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
  };

  //passport router
  myAuth.authRouter = () => {
    const express = require("express");
    const router = express.Router();

    router.post("/login", (req, res, next) => {
      passport.authenticate("local-signin", (error, user) => {
        if (error) {
          return res.status(500).json(error);
        }

        if (!user) {
          return res.status(401).json({});
        }

        req.login(user, (error) => {
          if (error) {
            return res.status(500).json(error);
          }

          res.redirect("/");
          return res.json({
            message: "successfully sign in!",
          });
        });
      })(req, res, next);
    });

    router.post("/logout", function (req, res) {
      try {
        req.logout();
        return res.json({ message: "successfully logged out!" });
      } catch (err) {
        return res.status(404).json({ error: err });
      }
    });

    router.get("/getUser", (req, res) => {
      if (req.user && req.user.username != null) {
        res.json(req.user.username);
      } else {
        res.status(404).json({ error: "can't find user." });
      }
    });

    router.post("/register", (req, res, next) => {
      passport.authenticate("local-signup", (error, user) => {
        if (error) {
          return res.status(500).json(error);
        }

        req.login(user, (error) => {
          if (error) {
            return res.status(500).json(error);
          } else {
            return res.json({
              message: "successfully sign up and sign in!",
            });
          }
        });
      })(req, res, next);
    });

    router.get("/", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "..", "front", "build", "index.html")
      )
    );

    router.get("/detail/*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "..", "front", "build", "index.html")
      )
    );

    return router;
  };
  return myAuth;
}
module.exports = MyAuth();
