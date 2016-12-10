/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * Mostrar todos los usuario en el 'index' de los usuarios.
	 */
	index: function (req, res, next) {
		User.find(function (err, users) {
			if (err) {
				return res.serverError(err);
			}

			res.view({
				users: users
			});
		});
	},

	/**
	 * Formulario parar crear un nuevo usuario
	 */
	new: function (req, res, next) {
		return res.view();
	},

	/**
	 * Crear un usuario, guardar los datos que vienen desde un formulario
	 */
	create: function (req, res, next) {
		let newUserInfo = {
			name: req.param('name'),
			lastname: req.param('lastname'),
			username: req.param('username'),
			email: req.param('email'),
			password: req.param('password'),
			passwordConfirmation: req.param('passwordConfirmation'),
		};

		User.create(newUserInfo, function (err, user) {
			if (err) {
				if (err.name === 'passwordDoesNotMatchError') {
					return res.badRequest(err);
				}
				return res.serverError(err);
			}

			delete user.encryptedPassword;
			res.redirect('/user');
		});
	},

	/**
	 * Mostrar información de un usuario
	 */
	show: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user) {
			if (err) {
				return res.serverError(err);
			}

			else if (!user) {
				return res.notFound(`Usuario con 'id' = ${req.param('id')} no se encontró.`);
			}

			return res.view({
				user: user
			});
		});
	},

	/**
	 * Mostrar la información del usuario lista para modificar.
	 */
	edit: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user) {
			if (err) {
				return res.serverError(err);
			}

			else if (!user) {
				return res.notFound(`Usuario con 'id' = ${req.param('id')} no se encontró.`);
			}

			return res.view({
				user: user
			});
		});
	},

	/**
	 * Modificar la información de un usuario
	 */
	update: function (req, res, next) {
		let newUserInfo = {
			name: req.param('name'),
			lastname: req.param('lastname'),
			username: req.param('username'),
			email: req.param('email')
		};

		User.update(req.param('id'), newUserInfo, function (err, user) {
			if (err) {
				return res.serverError(err);
			}

			res.redirect(`/user/show/${req.param('id')}`);
		});
	},

	/**
	 * Eliminar un usuario
	 */
	destroy: function (req, res, next) {
		User.destroy(req.param('id'), function (err) {
			if (err) {
				return res.serverError(err);
			}

			res.redirect('/user');
		});
	}

};
