import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
  pageId: { type: String, required: true },
  prizeName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Prize = mongoose.model('Prize', prizeSchema);
export default Prize;
