const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
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
    expires: 60 * 3,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
