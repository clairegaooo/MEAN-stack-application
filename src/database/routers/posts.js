const express = require('express');
const Router = express.Router();
const { post } = require('../models/posts');
const { user } = require('../models/users');

Router.post('/saveposts', async function (req,res) {
  req.body.createdBy = req.decoded.username;
  const post_doc = post(req.body);
  try {
    const result = await post_doc.save();
    res.send({success: true});
  }
  catch (e) {
    res.send(e.message);
  }
});
Router.get('/getposts', async function (req, res) {
  try {
    const result = await post.find()
      .select({"title":1, "description":1, "createdBy":1, "likes":1, "users_liked_post":1, "comments":1, _id: 1});
    res.send(result);
  }
  catch (e) {
    res.send(e.message);
  }
});
Router.get('/administrator', async function (req, res) {
  try {
    await user.findOne({username: req.decoded.username}, function (err, foundUser) {
      res.send(foundUser);
    })
  }
  catch (e) {
    res.send(e.message);
  }
});
Router.post('/savelikes', async function (req, res) {
  try {
     await user.findOne({username: req.decoded.username}, function (err, foundUser) {
      if (!foundUser.likedPost.includes(req.body.postID)) {
        user.findByIdAndUpdate(foundUser._id, {$push: {likedPost: req.body.postID}}, function () {
          console.log("I have update the user information!");
        });
        post.findByIdAndUpdate(req.body.postID, {$push: {users_liked_post: req.decoded.username}}, function (err, foundPost) {
          if (err) {
            res.send(err.message);
          } else {
            res.send({
              success: true,
              postIdLiked: foundPost._id
            })
          }
        });
      } else {
        res.send({success: false});
      }
    });
  }
  catch (e) {
    res.send(e.message);
  }
});

Router.post('/delete', async function (req, res) {
  try {
    post.findByIdAndRemove(req.body.postID, function () {
      res.send({success: true});
    });
  }
  catch (e) {
    res.send(e.message)
  }
});

Router.post('/updatepost', async function (req, res) {
  try {
    const result = await post.findOne({_id: req.body.id}).update({title: req.body.title, description: req.body.description});
    res.send({success:true});
  }
  catch (e) {
    res.send(e.message);
  }
});

module.exports = Router;
//npm install jwt-decode
