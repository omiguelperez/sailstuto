
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      defaultsTo: 'Elliot'
    },

    lastname: {
      type: 'string',
      required: true,
      defaultsTo: 'Aldmisma altura erson'
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    email: {
      type: 'email',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    passwordConfirmation: {
      type: 'string',
      required: true
    },

    encryptedPassword: {
      type: 'string'
    },

    toJSON: function () {
      let user = this.toObject();

      delete user.password;
      delete user.passwordConfirmation;

      return user;
    }

  },

  beforeCreate: function (values, next) {
    bcrypt.hash(values.password, 10, function (err, encryptedPassword) {
      if (err) {
        return next(err);
      }

      values.encryptedPassword = encryptedPassword;

      next();
    });
  }

};
