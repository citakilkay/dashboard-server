import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    country: { type: String, required: true },
    rank: { type: Number, required: true },
    rankYesterday : {type: Number},
    money: { type: Number, default: 0 }
}, { collection: 'users' });

export default mongoose.model('User', UserSchema);