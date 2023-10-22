import mongoose, { Model, Schema } from 'mongoose';
import User from './userModel';

// _id is auto-generated in MongoDB.
const issueSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,

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
    minLength: 3,
    trim: true,
  },

  status: {
    type: String,
    default: 'OPEN',
    enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  assignedToUserId: { type: Schema.Types.String },
});

// Creating a model from Schema.
const Issue = mongoose.models.issues || mongoose.model('issues', issueSchema);

export default Issue;

// An issue can be assigned exclusively to a SINGLE USER.
// Multiple issues can be assigned to a particular user.
