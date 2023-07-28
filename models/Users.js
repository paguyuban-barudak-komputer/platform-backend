const mongoose = require("mongoose");

const usersScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    require: [true, 'Nama harus diisi']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    require: [true, 'Username harus diisi']
  },
  password: {
    type: String,
    required: true,
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