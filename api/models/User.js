
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

    /**
     * Parsear los datos de un usuario a formato JSON y eliminar las claves
     * que no están cifradas de este objeto.
     */
    toJSON: function () {
      let user = this.toObject();

      delete user.password;
      delete user.passwordConfirmation;

      return user;
    }

  },

  /**
   * Antes de guardar el usuario se quitan las claves que no están cifradas
   * y se agrega la clave que está cifrada para guardarla en la base de datos.
   */
  beforeCreate: function (values, next) {
    let password = values.password;
    let passwordConfirmation = values.passwordConfirmation;

    // error por las contraseñas
    if (!password || !passwordConfirmation || password != passwordConfirmation) {
      let passwordDoesNotMatchError = {
        name: 'passwordDoesNotMatchError',
        message: 'Las contraseñas no coinciden.'
      };
      return next(passwordDoesNotMatchError);
    }

    bcrypt.hash(values.password, 10, function (err, encryptedPassword) {
      if (err) {
        return next(err);
      }

      // las claves planas no se guardan, pero cifrada sí
      delete values.password;
      delete values.passwordConfirmation;
      values.encryptedPassword = encryptedPassword;

      next();
    });
  }

};
