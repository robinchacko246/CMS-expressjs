const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        default: 'public'
    },
    
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'public'
    },
    
    creationDate: {
        type: Date,
        default: Date.now()
    }
    
    
});

module.exports = {Test: mongoose.model('test', PostSchema )};
