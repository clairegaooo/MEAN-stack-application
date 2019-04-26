const express = require('express');
const Router = express.Router();
const { post } = require('../models/posts');

Router.post('/addcomment', async function (req, res) {
  try {
    await post.findOne({_id: req.body.post_id}, function (err, foundPost) {
      if (err) {
        console.log(err.message);
      } else {
        const newComment = {
          content: req.body.content,
          author: req.body.author
        };
        foundPost.update({$push: {comments: newComment}}, () => {
          res.send({success: true});
        });
      }
    });
  }
  catch (e) {
    res.send(e.message)
  }
});

module.exports = Router;
