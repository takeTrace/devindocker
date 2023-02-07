const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must a username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'must set password'],
  },
});

module.exports = mongoose.model('User', userSchema);
