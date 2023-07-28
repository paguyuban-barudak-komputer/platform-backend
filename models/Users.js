const mongoose = require("mongoose");

const usersScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    require: [true, 'nama harus diisi']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    require: [true, 'username harus diisi']
  },
  password: {
    type: String,
    required: true,
    require: [true, 'kata sandi harus diisi']
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