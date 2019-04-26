const mongoose = require('mongoose');
const likeSchema = mongoose.Schema({
  "post_id": String,
  "user_liked_this_post": []
});
const likeModel = mongoose.model('likes', likeSchema);
module.exports = {
  like: likeModel
};
