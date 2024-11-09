import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    token:String
});

export default new mongoose.model('token',tokenSchema);