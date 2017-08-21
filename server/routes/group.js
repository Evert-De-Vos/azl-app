var mongoose = require('mongoose');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var path = require('path');

var config = require('../config/config');
var Group = mongoose.model('Group');
var Member = mongoose.model('Member');

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

//get group by id
router.get('/findbyid/:group', auth, function (req, res, next) {
    req.group
        .populate({
            path: 'members'
        }, function (err, populated) {
            if (err) {
                res.status(500).json('could not populate group');
                return;
            }

            res.status(200).json(populated);
        });    
});

//add group
router.post('/add', auth, function (req, res, next) {
    var body = req.body;

    if (!body.name) {
        return res.status(400).json({
            message: 'name is a required field'
        });
    }

    Group.find({
            name: body.name
        },
        function (group) {
            if (!group) {
                var g = new Group();
                g.name = body.name;
                g.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: 'couldn\'t add group'
                        });
                    }
                    res.json(g);
                });
            } else {
                res.json(group);
            }
        });
});

//update group by id
router.put('/update/:group', auth, function (req, res, next) {
    var body = req.body;

    if (body.name) {
        req.group.name = body.name;
    }

    req.group.save(function (err, updated) {
        if (err) {
            res.status(500).json({
                message: 'couldn\'t update group with id = ' + group._id
            });
            return;
        }

        res.status(200).json(updated);
    });

});

//delete group by id
router.delete('/delete/:groupId', auth, function (req, res, next) {
    var id = req.params.groupId;
    
    Group.remove({
        _id: id
    }, function (err) {
        if (err) {
            res.status(500).json({
                message: 'failed to remove group with id =' + id
            });
        } else {
            res.status(200).json({
                message: 'Succesfully deleted group with id =' + id
            });
        }
    });
});

router.get('/all',auth, function (req, res, next) {
    Group.find({}, function (err, groups) {
        if (err) {
            res.status(500).json({
                message: 'failed to find all groups',
                error: err
            });
        } else {
            res.status(200).json(groups);
        }
    });
});

router.put('/:group/add/:member', auth, function (req, res, next) {
    var index = req.group.members.indexOf(req.member._id);

    if (index === -1) {
        req.group.members.push(req.member);
        req.group.save(function (err, updated) {
            if (err) {
                res.status(500).json({
                    message: 'couldn\'t add ' + member.firstname + ' to ' + group.name
                });
                return;
            }
            res.status(200).json(updated);
            return;
        });
    } else {
        res.status(200).json(req.group);
    }
});

router.put('/:group/remove/:member', auth, function (req, res, next) {
    var index = req.group.members.indexOf(req.member._id);

    if (index >= 0) {
        req.group.members.splice(index, 1);
        req.group.save(function (err, updated) {
            if (err) {
                res.status(500).json({
                    message: 'couldn\'t remove ' + req.member.firstname + " from " + req.group.name
                });
                return;
            }

            res.status(200).json(updated);
        });
    } else {
        res.status(200).json(req.group);
    }
});

module.exports = router;