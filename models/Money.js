import mongoose from 'mongoose';

const MoneySchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
}, { collection: 'moneys' });

export default mongoose.model('Money', MoneySchema);