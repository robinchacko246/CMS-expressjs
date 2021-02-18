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
    
    creationDate: {
        type: Date,
        default: Date.now()
    }
    
    
});

module.exports = {Team: mongoose.model('team', PostSchema )};
