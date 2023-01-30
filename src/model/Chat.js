const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const chatSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };
