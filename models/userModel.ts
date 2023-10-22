import mongoose, { Model, Schema } from 'mongoose';
import Issue from './issueModel';

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,

  name: {
    type: String,
    required: [true, 'Please enter a username'],
  },

  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
  },

  image: {
    type: String,
  },

  issues: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

// In Next, DB connection doesn't persist permanently.
// If the model already exists, then use it, else create a new one.
// In MongoDB, everything else BECOMES LOWERCASE.

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
