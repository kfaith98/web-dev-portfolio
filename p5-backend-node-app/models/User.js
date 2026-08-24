import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hook
userSchema.pre('save', async function () {
  // Guard
  if (!this.isModified('password')) return;
  // Hash
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model('User', userSchema);

export default User;
