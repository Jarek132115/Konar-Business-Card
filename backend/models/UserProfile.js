const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
