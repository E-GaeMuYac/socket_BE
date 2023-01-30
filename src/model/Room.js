const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = Schema(
  {
    room: {
      type: Array,
      require: true,
    },
    user: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };
