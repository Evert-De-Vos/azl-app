var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var config = require('../config/config');
var router = express.Router();

var Sheet = mongoose.model('AttendanceSheet');
var Group = mongoose.model('Group');
var Member = mongoose.model('Member');
var ObjectId = mongoose.Types.ObjectId;

var auth = jwt({
  secret: config.secret,
  userProperty: config.userProperty
});


router.param('sheet', function (req, res, next, id) {
  Sheet
    .findById(id)
    .exec(function (err, sheet) {
      if (err) {
        return next(err);
      }

      if (!sheet) {
        return next(new Error('Can\'t find attendancesheet with id = ' + id));
      }

      req.sheet = sheet;
      return next();
    });
});

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
  Group.findById(id, function (err, group) {
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

//findbyid
router.get('/findbyid/:sheet', auth, function (req, res, next) {
  req.sheet
    .populate({
      path: 'group',
      populate: {
        path: 'members',
        model: 'Member'
      }
    })
    .populate({
      path: 'attendees'
    })
    .populate({
      path: 'trainers'
    }, function (err, populated) {
      if (err) {
        res.status(500).json('could not populate sheet');
        return;
      }

      res.status(200).json(req.sheet);
    });
});


//findbygroup
router.get('/findbygroup/:groupId', auth, function (req, res, next) {
  var id = req.params.groupId;
  Sheet
    .find({
      group: new ObjectId(id)
    })
    .populate({
      path: 'group',
    })
    .populate({
      path: 'attendees'
    })
    .populate({
      path: 'trainers'
    })
    .exec(function (err, sheets) {
      if (err) {
        res.status(500);
        return;
      }

      if (!sheets || sheets.length === 0) {
        res.status(204).json({
          message: 'couldn\'t find any attandancesheets for group with id : ' + id
        });
        return;
      }

      res.status(200).json(sheets);
    });
});

//findbytrainer
router.get('/findbytrainer/:memberid', auth, function (req, res, next) {
  var id = req.params.memberid;

  Sheet
    .find({
      trainers: new ObjectId(id)
    })
    .populate({
      path: 'group',
      select: '-members'
    })
    .populate({
      path: 'attendees'
    })
    .populate({
      path: 'trainers'
    })
    .exec(function (err, sheets) {
      if (err) {
        console.log(err);
        res.status(500);
        return;
      }

      if (!sheets || sheets.length === 0) {
        res.status(204).json({
          message: 'couldn\'t find any attandancesheets for trainer with id :' + id
        });
        return;
      }

      res.status(200).json(sheets);
    });
});

//add
router.post('/add', function (req, res, next) {
  var body = req.body;

  if (!hasValidBody) {
    return;
  }

  Sheet
    .find({
      date: body.date,
      group: new ObjectId(body.group.id)
    })
    .exec(function (err, sheets) {
      if (err) {
        res.status(500);
        return;
      }

      if (sheets.length === 0) {
        var s = new Sheet();
        s.date = body.date;
        s.group = body.group;
        s.trainers = body.trainers;
        s.attendees = body.attendees;
        s.save(function (err, saved) {
          if (err) {
            res.status(500).json({
              message: 'internal error'
            });
            return;
          }

          res.status(200).json(saved);
        });
      } else {
        res.status(409).json({
          message: 'there is already a sheet with this date and group'
        });
      }
    })
});

//update
router.put('/update/:sheet', auth, function (req, res, next) {

  if (!hasValidBody(req, res)) {
    return;
  }

  var sheet = req.sheet;
  var update = req.body;

  sheet.date = update.date;
  sheet.attendees = update.attendees;
  sheet.trainers = update.trainers;

  sheet.save(function (err, saved) {
    if (err) {
      res.status(500).json({
        message: 'internal error saving sheet'
      });
      return;
    }

    res.status(200).json({
      message: 'updated sheet'
    });
  });

});

//delete
router.delete('/delete/:sheet', auth, function (req, res, next) {

});

function hasValidBody(req, res) {
  var body = req.body;

  if (!body.date) {
    res.status(400).json({
      message: 'An attendancesheet requires a date'
    });
    return false;
  }

  if (!body.group) {
    res.status(400).json({
      message: 'An attendancesheet requires a group'
    });
    return false;
  }

  if (!body.trainers || body.trainers.length === 0) {
    res.status(400).json({
      message: 'An attendancesheet requires at least one trainer'
    });
    return false;
  }

  return true;
}

module.exports = router;
