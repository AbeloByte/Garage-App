//  import express module 
const express = require('express')
//  call the router method from the express 
const router  = express.Router()
// import the install controller
const installController = require('../Controllers/install.controller')

// create a route to handle the install req
router.get('/install',installController.install) 


module.exports = router