var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Member = mongoose.model('Member');
var Group = mongoose.model('Group');
var Sheet = mongoose.model('Sheet');

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

router.param('sheet', function (req, res, next, id) {
    Sheet.findById(id, function (err, sheet) {
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