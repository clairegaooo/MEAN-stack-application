const mongoose =  require('mongoose');
const postSchema = mongoose.Schema({
  "title": String,
  "description": String,
  "createdBy": String,
  "likes": [
    {
      userId: String,
      name: String,
    }
  ],
  "date": {
    type: Date,
    default: Date.now()
  },
  "isPosted": {
    type: Boolean,
    default: true
  },
  "users_liked_post": [],
  "comments": [
    {
      "author": String,
      "content": String
    }
  ]
});
const postModel =  mongoose.model('posts', postSchema);
module.exports = {
  post: postModel
};
