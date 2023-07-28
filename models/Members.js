const mongoose = require('mongoose')

const membersScheme = mongoose.Schema({
  nim: {
    type: String
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi']
  },
  email: {
    type: String
  },
  classes: {
    type: String
  },
  gender: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  instagram: {
    type: String
  },
  photo: {
    type: String,
    require: [true, 'Foto harus diisi']
  },
  memberPositionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberPositions'
  },
  structuralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Structurals'
  },
  periodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Periode'
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Members', membersScheme);