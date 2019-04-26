const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  "username": String,
  "password": String,
  "email": String,
  "gender": String,
  "date": {
    type: Date,
    default: Date.now()
  },
  "isRegistered": {
    type: Boolean,
    default: true
  },
  "likedPost":[]
});

const userModel = mongoose.model("users", userSchema);

module.exports = {
  user: userModel
};
