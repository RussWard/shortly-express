var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  //patch: false,
  // defaults: {
  //   visits: 0
  // },
  // clicks: function() {
  //   return this.hasMany(Click);
  // },

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var password = model.get('password')
      console.log("THIS IS PASSWORD--->", password)
      return new Promise((resolve,reject)=> {
        bcrypt.hash(password, null, null, function(err, hash) {
        model.set('password', hash);
        resolve(hash);  
        });
      })
    });
  }
});


module.exports = User;