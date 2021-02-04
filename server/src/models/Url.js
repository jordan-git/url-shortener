import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    short: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Url', UrlSchema);
