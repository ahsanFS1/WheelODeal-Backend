import mongoose from "mongoose";

const secretKeysSchema = new mongoose.Schema({
  secretKey: { type: String, required: true, unique: true },
  projectName: { type: String, required: true },
  projectId: { type: String, required: true },
  plan: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  totalPages: { type: Number, required: true, default: 1 }, // Based on the plan
  remainingPages: { type: Number, required: true, default: 1 }, // Tracks available slots
}, { timestamps: true });


export default mongoose.model("SecretKey", secretKeysSchema);
