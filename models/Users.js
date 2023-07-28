const mongoose = require("mongoose");

const usersScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama harus diisi']
  },
  username: {
    type: String,
    unique: true,
    require: [true, 'Username harus diisi']
  },
  password: {
    type: String,
    require: [true, 'Kata sandi harus diisi']
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin'],
    default: 'admin',
    required: true
  }
},
{
    timestamps: true
});

module.exports = mongoose.model("Users", usersScheme);