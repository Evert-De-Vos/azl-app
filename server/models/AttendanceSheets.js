var mongoose = require('mongoose');

var AttendanceSheetSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'        
    }],
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }]
});

// Duplicate the ID field.
AttendanceSheetSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AttendanceSheetSchema.set('toJSON', {
    virtuals: true
});

mongoose.model('AttendanceSheet', AttendanceSheetSchema);