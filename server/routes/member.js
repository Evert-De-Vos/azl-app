var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var config = require('../config/config');
var router = express.Router();
var path = require('path');

var Member = mongoose.model('Member');
var Group = mongoose.model('Group');
var Sheet = mongoose.model('AttendanceSheet');
var ObjectId = mongoose.Types.ObjectId;

var auth = jwt({secret: config.secret,userProperty: config.userProperty});

//params
router.param('member', function (req, res, next, id) {
  Member.findById(id, function (err, member) {
    if (err) {
      return next(err);
    }
    if (!member) {
      return next(new Error('Can\'t find member with id = ' + id));
    }
    req.member = member;
    return next();
  });
});

router.param('group', function (req, res, next, id) {
  var query = Group.findById(id);
  query.exec(function (err, group) {
    if (err) {
      return next(err);
    }
    if (!group) {
      return next(new Error('Can\'t find group with id = ' + id));
    }
    req.group = group;
    return next();
  });
});

//get all members
router.get('/all', auth, function (req, res, next) {
  Member.find(function (err, members) {
    if (err) {
      return next(err);
    }
    res.status(200).json(members);
  });
});

//get memeber by id
router.get('/findbyid/:member', auth, function (req, res, next) {
  res.status(200).json(req.member);
});

router.get('/trainers/all', auth, function (req, res, next) {

  Member
    .find({
      isTrainer: true
    }, function (err, members) {

      if (err) {
        res.status(500).json({
          message: err
        });
      }

      if (members.length === 0) {
        return res.status(204).json({
          message: 'no trainers found'
        });
      }

      return res.status(200).json(members);

    });
});


//add member
router.post('/add', auth, function (req, res, next) {
  if (!req.body.firstname) {
    return res.status(400).json({
      message: 'firstName is a required field'
    });
  }

  if (!req.body.lastname) {
    return res.status(400).json({
      message: 'lastName is a required field'
    });
  }

  if (!req.body.birthdate) {
    return res.status(400).json({
      message: 'birthdate is a required field'
    });
  }

  Member.find({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    },
    function (member) {
      if (!member) {
        var m = new Member();
        m.firstname = req.body.firstname;
        m.lastname = req.body.lastname;
        m.birthdate = new Date(req.body.birthdate);
        m.save(function (err) {
          if (err) {
            console.log(err);
            res.status(500).json({
              message: 'couldn\'t add member'
            });
          }
          res.json(m);
        });
      } else {
        res.json(member);
      }
    });
});


//update member by id
router.put('/update/:member', auth, function (req, res, next) {
  var member = req.member;
  var body = req.body;

  if (body.firstName) {
    member.firstName = body.firstName;
  }

  if (body.lastName) {
    member.lastName = body.lastName;
  }

  if (body.lastName) {
    member.birthdate = body.firstName;
  }

  member.save(function (err, updated) {
    if (err) {
      res.status(500).json({
        message: 'couldn\'t update member with id = ' + member._id
      });
      return;
    }

    res.status(200).json(updated);
  });
});

//delete member by id
router.delete('/delete/:member', auth, function (req, res, next) {
  //delete member from groups
  Group.find({
    members: new ObjectId(req.member._id)
  }, function (err, groups) {
    for (i = 0; i < groups.length; i++) {
      var index = groups[i].members.indexOf(req.member._id);
      groups[i].members.splice(index, 1);
      groups[i].save( function (error) {
        if (error) {
          console.log(error);
        }
      });
    }

  });

  Member.remove({
    _id: req.member._id
  }, function (err) {
    if (err) {
      res.status(500).json({
        message: 'failed to remove member with id =' + req.member._id
      });
    } else {
      res.status(200).json({
        message: 'Succesfully deleted member with id =' + req.member._id
      });
    }
  });
});

// router.get('/:memberId/attendences/',function(req,res,next){
//     var id = req.params.memberId;
//     var 

// });

module.exports = router;
