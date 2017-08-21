(function () {

  var mongoose = require('mongoose');
  var Member = mongoose.model('Member');
  var Group = mongoose.model('Group');
  var Sheet = mongoose.model('AttendanceSheet');
  var User = mongoose.model('User');

  var evert;
  var willem;
  var hilde;
  var generikSnorkels = [];
  var generikSharks = [];
  var generikSpeedys = [];
  var snorkels;
  var sharks;
  var speedys;
  var sheet;

  //User
  var addUsers = function () {
    User.find({}, function (err, users) {
      if (users.length === 0) {
        user = new User();
        user.username = "Evert De Vos";
        user.email = "evertdevosopwijk@gmail.com";
        user.password = "evertiscool";
        user.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added user Evert De Vos');
      }
    });
  };

  //members  
  var addMembers = function () {
    Member.find({}, function (err, members) {
      if (members.length === 0) {
        evert = new Member();
        evert.isTrainer = true;
        evert.firstName = 'Evert';
        evert.lastName = 'De Vos';
        evert.birthdate = new Date(96, 6, 2);

        evert.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added evert');

        willem = new Member();
        willem.isTrainer = true;
        willem.firstName = 'Willem';
        willem.lastName = 'De Vos';
        willem.birthdate = new Date(93, 7, 27);

        willem.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added willem');

        hilde = new Member();
        hilde.isTrainer = true;
        hilde.firstName = 'Hilde';
        hilde.lastName = 'Vermeir';
        hilde.birthdate = new Date(84, 7, 27);

        hilde.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added hilde');

        hilde = new Member();
        hilde.isTrainer = true;
        hilde.firstName = 'Johan';
        hilde.lastName = 'De Vos';
        hilde.birthdate = new Date(84, 7, 27);

        hilde.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added hilde');

        var newMember;

        for (var snorkel of snorkelMembers) {
          newMember = new Member();
          newMember.lastName = snorkel.lastname;
          newMember.firstName = snorkel.firstname;
          newMember.birthdate = snorkel.birthdate;
          newMember.save(function (err, saved) {
            if (err) {
              console.log(err);
            }
          });

          generikSnorkels.push(newMember);
        }

        for (var shark of sharkMembers) {
          newMember = new Member();
          newMember.lastName = shark.lastname;
          newMember.firstName = shark.firstname;
          newMember.birthdate = shark.birthdate;
          newMember.save(function (err, saved) {
            if (err) {
              console.log(err);
            }
            
          });
          
          generikSharks.push(newMember);
        }

        for (var speedy of speedyMembers) {
          newMember = new Member();
          newMember.lastName = speedy.lastname;
          newMember.firstName = speedy.firstname;
          newMember.birthdate = speedy.birthdate;
          newMember.save(function (err, saved) {
            if (err) {
              console.log(err);
            }
            
          });
          
          generikSpeedys.push(newMember);
        }
      }
      addGroups();
    });
  };

  //groups
  var addGroups = function () {
    Group.find({}, function (err, groups) {
      if (groups.length === 0) {
        snorkels = new Group();
        snorkels.name = 'Snorkels';
        snorkels.members = generikSnorkels;
        snorkels.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added snorkels');

        sharks = new Group();
        sharks.name = 'Sharks';
        sharks.members = generikSharks;
        sharks.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added sharks');

        speedys = new Group();
        speedys.name = 'Speedys';
        speedys.members = generikSpeedys;
        speedys.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added speedys');
      }
      addSheets();
    });
  };

  var addSheets = function () {
    Sheet.find({}, function (err, sheets) {
      if (sheets.length === 0) {
        sheet = new Sheet();
        sheet.date = Date.now();
        sheet.group = snorkels;
        sheet.trainers.push(evert);
        sheet.attendees.push(willem);
        sheet.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

        console.log('added sheets');
      }
    });

  };



  var snorkelMembers = [{
      firstname: 'Fred',
      lastname: 'De Vis',
      birthdate: new Date(2001, 3, 15)
    },
    {
      firstname: 'Jan',
      lastname: 'Rosseel',
      birthdate: new Date(2001, 4, 18)
    },
    {
      firstname: 'Bert',
      lastname: 'Van Dam',
      birthdate: new Date(2001, 9, 13)
    },
    {
      firstname: 'Anne',
      lastname: 'Van Mol',
      birthdate: new Date(2002, 6, 19)
    },
    {
      firstname: 'Lotte',
      lastname: 'Guffens',
      birthdate: new Date(2002, 7, 23)
    },
    {
      firstname: 'Inne',
      lastname: 'Ravijts',
      birthdate: new Date(2002, 7, 24)
    },
    {
      firstname: 'Lore',
      lastname: 'De Bleser',
      birthdate: new Date(2002, 8, 10)
    },
    {
      firstname: 'Jaan',
      lastname: 'Gilijns',
      birthdate: new Date(2001, 3, 7)
    },
    {
      firstname: 'Kenneth',
      lastname: 'Bellon',
      birthdate: new Date(2002, 6, 21)
    },
    {
      firstname: 'Sharon',
      lastname: 'Van Roode',
      birthdate: new Date(2002, 6, 9)
    },
    {
      firstname: 'John',
      lastname: 'Bullox',
      birthdate: new Date(2002, 8, 18)
    }
  ];

  var sharkMembers = [{
      firstname: 'Fred',
      lastname: 'De Vis',
      birthdate: new Date(2001, 3, 15)
    },
    {
      firstname: 'Jan',
      lastname: 'Rosseel',
      birthdate: new Date(2001, 4, 18)
    },
    {
      firstname: 'Bert',
      lastname: 'Van Dam',
      birthdate: new Date(2001, 9, 13)
    },
    {
      firstname: 'Anne',
      lastname: 'Van Mol',
      birthdate: new Date(2002, 6, 19)
    },
    {
      firstname: 'Lotte',
      lastname: 'Guffens',
      birthdate: new Date(2002, 7, 23)
    },
    {
      firstname: 'Inne',
      lastname: 'Ravijts',
      birthdate: new Date(2002, 7, 24)
    },
    {
      firstname: 'Lore',
      lastname: 'De Bleser',
      birthdate: new Date(2002, 8, 10)
    },
    {
      firstname: 'Jaan',
      lastname: 'Gilijns',
      birthdate: new Date(2001, 3, 7)
    },
    {
      firstname: 'Kenneth',
      lastname: 'Bellon',
      birthdate: new Date(2002, 6, 21)
    },
    {
      firstname: 'Sharon',
      lastname: 'Van Roode',
      birthdate: new Date(2002, 6, 9)
    },
    {
      firstname: 'John',
      lastname: 'Bullox',
      birthdate: new Date(2002, 8, 18)
    }
  ];

  var speedyMembers = [{
      firstname: 'Joni',
      lastname: 'Lissens',
      birthdate: new Date(1996, 3, 15)
    },
    {
      firstname: 'Toon',
      lastname: 'Vandooren',
      birthdate: new Date(1996, 4, 18)
    },
    {
      firstname: 'Rens',
      lastname: 'Esselens',
      birthdate: new Date(1996, 9, 13)
    },
    {
      firstname: 'Arne',
      lastname: 'De Vis',
      birthdate: new Date(1997, 6, 19)
    },
    {
      firstname: 'Jasper',
      lastname: 'De man',
      birthdate: new Date(1997, 7, 23)
    },
    {
      firstname: 'Bram',
      lastname: 'De Man',
      birthdate: new Date(1997, 7, 23)
    },
    {
      firstname: 'Maxim',
      lastname: 'Gevers',
      birthdate: new Date(1997, 8, 10)
    },
    {
      firstname: 'Bastiaan',
      lastname: 'Baeten',
      birthdate: new Date(1996, 3, 7)
    },
    {
      firstname: 'Conny',
      lastname: 'Comen',
      birthdate: new Date(1997, 6, 21)
    },
    {
      firstname: 'Ray',
      lastname: 'Bock',
      birthdate: new Date(1997, 6, 9)
    },
    {
      firstname: 'Pieter',
      lastname: 'Berghman',
      birthdate: new Date(1997, 8, 18)
    }
  ];

  addMembers();
  addUsers();

})();
