var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    },

    members: [{type:mongoose.Schema.Types.ObjectId, ref:'Member'}],
    
    //picture
    // Schedule: [{
    //     standardTrainers:[{type: mongoose.Schema.Types.ObjectId,ref:'Member'}],
    //     day: {
    //         type:String,
    //         enum: ['Mon','Tues','wed','thurs','fri','sat','sun']
    //     },
    //     from: {
    //         type:Number,
    //         max: 82800
    //     },
    //     to: {
    //         type:Number,
    //         max:86400
    //     }
    // }]


});

GroupSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
GroupSchema.set('toJSON', {
    virtuals: true
});

mongoose.model('Group',GroupSchema);