import mongoose from 'mongoose';

const authoritySchema = new mongoose.Schema({
    Name:String,
    Email:String,
    AuthorizationLevel:String
});

export default new mongoose.model('authority',authoritySchema);