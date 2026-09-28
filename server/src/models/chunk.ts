import mongoose, { Schema, model } from 'mongoose';

const chunkSchema = new Schema({
    documentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    embedding:{
        type: [Number],
        default: [],
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true,
    },
});

export default model('Chunk', chunkSchema);