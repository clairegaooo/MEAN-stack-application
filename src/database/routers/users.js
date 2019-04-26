const express = require('express');
const Router = express.Router();
const jwt = require("jsonwebtoken");
const { user } = require('../models/users');

Router.post('/saveusers', async function (req, res) {
  const exitUser = await user.find({"username":req.body.username});
  const user_doc = user(req.body);
  try {
    if (exitUser.length === 0){
      const result = await user_doc.save();
      res.send({success: true});
      console.log("the new user saved!");
    } else {
      res.send({success: false});
    }
  }
  catch (e) {
    res.send(e.message);
  }
});

Router.post('/authenticate', async function (req, res) {
  const landedUser = await user.find({"username":req.body.username, "password": req.body.password});
   try {
    if (landedUser.length !== 0) {
      let token = jwt.sign({
        username:req.body.username,
        org:"Marlabs"
      },"marlabs-scret-key",{
        expiresIn : "1h"
      });
      // const user_id = await
      res.send({
        isLoggedIn: true,
        token: token,
      })
    } else {
      res.send({isLoggedIn: false});
    }
  }
  catch (e) {
    res.send(e.message);
  }
});

module.exports = Router;

