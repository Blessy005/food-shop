const User = require("../models/User");

// // CREATE
// exports.createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// READ
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

