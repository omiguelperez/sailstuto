/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const bcrypt = require('bcrypt');

module.exports = {

	/**
	 * Mostrar la vista para iniciar sesión.
	 */
	new: function (req, res, next) {
		return res.view('session/new');
	},

	create: function (req, res, next) {
		let username = req.param('username');
		let password = req.param('password');

		if (!username || !password) {
			let NoUsernameOrPasswordError = {
        name: 'NoUsernameOrPasswordError',
        message: 'Debe proporcionar un usuario y contraseña.'
      };
      return res.badRequest(passwordDoesNotMatchError);
		}

		User.findOneByUsername(username, function (err, user) {
			if (err) {
				return res.serverError(err);
			} else if (!user) {
				let NoUserFoundedError = {
					name: 'NoUserFoundedError',
					message: `No se encontró el usuario ${username}.`
				};
				return res.send(NoUserFoundedError, 401);
			}

			bcrypt.compare(password, user.encryptedPassword, function (err, valid) {
				if (err) {
					console.log('El error está aquí.');
					return res.serverError(err);
				} else if (!valid) {
					let passwordDoesNotMatchError = {
		        name: 'passwordDoesNotMatchError',
		        message: 'La contraseña es incorrecta.'
		      };
		      return res.forbidden(passwordDoesNotMatchError);
				}

				return res.redirect(`/user/show/${user.id}`);
			});
		});
	}

};
