const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  mainTopic: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  about: { type: String, required: true },
  googleFormLink: { type: String },
  curriculum: [
    {
      subtopic: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Course', courseSchema);