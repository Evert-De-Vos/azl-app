var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
    isTrainer: {
        type:Boolean,
        default : false,
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    birthdate: {
        type:Date,
        required:true
    }
    
    //picture    

});

MemberSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MemberSchema.set('toJSON', {
    virtuals: true
});

mongoose.model('Member', MemberSchema);