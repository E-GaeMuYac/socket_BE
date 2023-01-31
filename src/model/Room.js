const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = Schema({
  room: {
    type: Object,
    require: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };
