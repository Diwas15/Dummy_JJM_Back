import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
    Email:String,
    schemeEvaluation:String,
    SchemeID:String
});

export default new mongoose.model('evaluation',evaluationSchema);