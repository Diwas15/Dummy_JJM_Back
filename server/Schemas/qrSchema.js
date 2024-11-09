import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema({
    schemeID:String,
    Name:String,
    data:String
});

export default new mongoose.model('code',qrSchema);