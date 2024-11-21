import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    Complainant:Object,
    Complaint:Object,
    Description:String,
    Location:Object
});

export default new mongoose.model('complaint',complaintSchema);