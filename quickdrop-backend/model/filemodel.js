import mongoose from "mongoose"

const schema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '7h' }
    }
})

const filemodel = mongoose.model('files', schema)
export default filemodel;