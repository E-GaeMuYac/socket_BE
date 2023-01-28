const mongoose = require('mongoose');

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
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat };
