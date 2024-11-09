import mongoose from 'mongoose';


const schemeSchema = new mongoose.Schema({
    schemeID:String,
    data: Object
});

export default new mongoose.model('scheme',schemeSchema);