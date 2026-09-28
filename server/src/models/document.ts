import mongoose, { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    fileName:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true,
    }
});

export default model('Document', documentSchema);