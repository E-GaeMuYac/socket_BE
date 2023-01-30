const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = Schema(
  {
    room: {
      type: Object,
      require: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };
