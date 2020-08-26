const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScoreSchema = new Schema({
  username: {
    type: String,
    required: 'username cannot be empty',
    unique: true,
    lowercase: true,
    trim: true,
  },
  total: { type: Number, required: "total can't be empty" },
  date: { type: Date },
})

module.exports = Score = mongoose.model('score', ScoreSchema)
