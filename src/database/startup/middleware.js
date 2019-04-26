const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const routes_users = require('../routers/users');
const routes_posts = require('../routers/posts');
const routes_comments = require('../routers/comments');

module.exports = function(app){
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use('', routes_users);

  app.use((req,res,next)=>{
    let token = req.headers.authtoken || req.body.authtoken || req.params.authtoken;
    jwt.verify(token,"marlabs-scret-key",function (err,decoded) {
      if (err){
        res.status(403).send({
          err:"Invalid Details",
          isLoggedIn:false
        })
      } else {
        req.decoded = decoded;
        next();
      }
    })
  });

  app.use('', routes_posts);
  app.use('', routes_comments);
};


