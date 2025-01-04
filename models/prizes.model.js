import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
  pageId: { type: String, required: true },
  prizeName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  prizesClaimed: { 
    type: Number, 
    default: 0, 
    min: 0, 
    validate: {
      validator: Number.isInteger,
      message: 'Prizes claimed must be an integer'
    }
  },
  prizesRevealed: { 
    type: Number, 
    default: 0, 
    min: 0, 
    validate: {
      validator: Number.isInteger,
      message: 'Prizes revealed must be an integer'
    }
  }
});

const Prize = mongoose.model('Prize', prizeSchema);
export default Prize;