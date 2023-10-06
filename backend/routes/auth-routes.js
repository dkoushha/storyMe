// routes/auth-routes.js

const express = require('express')
const authRoutes = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

// require the user model !!!!
const Users = require('../models/user-model')


// add express-validation
const { validationResult } = require('express-validator')
const signUpValidation = require('../helpers/middlewares').signUpValidation
const loggedIn = require('../helpers/middlewares').loggedIn


//POST /api/singup
authRoutes.post('/signup', signUpValidation, loggedIn, (req, res, next) => {
  // get the validation errors
  const errors = validationResult(req.body)
  const newErrorList = errors.array().map((error) => error.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: newErrorList,
    })
  }
  const email = req.body.email
  const password = req.body.password
  const checked = req.body.checked
  const image = req.body.image
  const userName = req.body.userName

  Users.findOne({ email })
    .then((res) => {
      //Save new user
      const salt = bcrypt.genSaltSync(10)
      const hashPass = bcrypt.hashSync(password, salt)

      const newUser = new Users({
        email,
        password: hashPass,
        userName,
        about: '',
        image,
      })

      return newUser.save()
    })
    .then((newUser) => {
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' })
          return
        }
        // Send the user's information to the frontend
        res.status(200).json(newUser)
      })
    })
})

//POST /api/login
authRoutes.post('/login', loggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info, status) => {
    if (!user) {
      res.status(401).json({ errors: info.message })
      return
    }

    // save user in session
    req.login(user, (err) => {
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(user)
    })
  })(req, res, next)
})

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout((err) => {
    if (err) {
      return next(err)
    }

    res.status(200).json({ message: 'Log out success!' })
  })
})

//React needs this route -> just see if anyone is logged in
authRoutes.get('/checkuser', (req, res, next) => {
  if (req.user) {
    res.json({ userDoc: req.user })
  } else {
    res.json({ userDoc: null })
  }
})



module.exports = authRoutes
