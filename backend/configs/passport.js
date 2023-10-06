const Users = require('../models/user-model')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id)
})

//makes req.user available for every request
passport.deserializeUser((userIdFromSession, cb) => {
  Users.findById(userIdFromSession).then((userDocument, err) => {
    if (err) {
      cb(err)
      return
    }
    cb(null, userDocument)
  })
})

//LocalStrategy -> Loggin in user via email / password (not sign up)
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, next) => {
    Users.findOne({ email }).then((foundUser, err) => {
      if (err) {
        next(err)
        return
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect username.' })
        return
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password.' })
        return
      }

      next(null, foundUser)
    })
  }),
)


