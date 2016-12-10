/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      defaultsTo: 'Oscar'
    },

    lastName: {
      type: 'string',
      required: true,
      defaultsTo: 'Pérez'
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    email: {
      type: 'email',
      required: true
    }

  }
};
