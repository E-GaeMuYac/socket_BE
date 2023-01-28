require('dotenv').config();

exports.chatList = async (req, res) => {
  let targets = [
    {
      soldBy: user.nickname,
      _id: 1,
      title: `운영자`,
      nickname: `오쿠`,
      sellerunique: process.env.ADMIN_ID,
      soldById: user._id,
    },
  ];

  res.send({ targets });
};
