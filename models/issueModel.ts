import mongoose from 'mongoose';

// _id is auto-generated in MongoDB.
const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 255,
  },

  description: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
  },
});

// Creating a model from Schema.
const Issue = mongoose.models.issues || mongoose.model('issues', issueSchema);

export default Issue;
