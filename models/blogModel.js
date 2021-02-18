const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    blogHead: {
        type: String,
        required: true
    },
    blogBy: {
        type: String,
        required: true
    },
    blogDetails:{

        type:String,
        required:true
    },
    status: {
        type: String,
        default: 'public'
    },
    
    image: {
        type: String,
        required: true
    },
    
    blogCreated: {
        type: Date,
        default: Date.now()
    }
    
    
});

module.exports = {Blog: mongoose.model('blog', PostSchema )};
