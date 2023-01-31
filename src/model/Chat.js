const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = Schema({
  room: {
    type: Object,
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  loginType: {
    type: Boolean,
    require: true,
  },
  admin: {
    type: Boolean,
    require: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 * 24 * 3,
  },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };
