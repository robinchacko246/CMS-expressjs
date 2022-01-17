const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    
    image: {
        type: String,
        required: false
    },
    
    creationDate: {
        type: Date,
        default: Date.now()
    }
    
    
});

module.exports = {Portfolio: mongoose.model('portfolio', PostSchema )};
