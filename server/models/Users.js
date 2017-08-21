var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  isHashed: {
    type: Boolean,
    default: false
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }]
});

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isHashed) {
    return next();
  }

  bcrypt.hash(user.password, salt, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    user.isHashed = true;
    return next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

mongoose.model('User', UserSchema);
