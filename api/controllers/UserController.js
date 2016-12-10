/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * Formulario parar crear un nuevo usuario
	 *
	 * @param  {object} req HttpRequest
	 * @param  {object} res HttpResponse
	 */

	new: function (req, res) {
		return res.view('user/new');
	},

	/**
	 * Metodo para crear un nuevo usuario
	 *
	 * @param  {object} req HttpRequest
	 * @param  {object} res HttpResponse
	 */

	create: function (req, res) {
		let newUserInfo = {
			name: req.param('name'),
			lastname: req.param('lastname'),
			username: req.param('username'),
			email: req.param('email')
		};

		User.create(newUserInfo, function (err, user) {
			if (err) {
				return res.serverError(err);
			}

			return res.redirect('/user');
		});
	},

	/**
	 * Mostrar información de un usuario
	 *
	 * @param  {object}   req  HttpRequest
	 * @param  {object}   res  HttpResponse
	 * @param  {Function} next Callback
	 */

	show: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user) {
			if (err) {
				return res.serverError(err);
			}

			else if (!user) {
				return res.notFound(`Usuario con 'id' = ${req.param('id')} no se encontró.`);
			}

			return res.view('user/show', {
				user: user
			});
		});
	},

	/**
	 * Mostrar la información del usuario lista para modificar.
	 *
	 * @param  {object}   req  HttpRequest
	 * @param  {object}   res  HttpResponse
	 * @param  {Function} next Callback
	 */

	edit: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user) {
			if (err) {
				return res.serverError(err);
			}

			else if (!user) {
				return res.notFound(`Usuario con 'id' = ${req.param('id')} no se encontró.`);
			}

			return res.view('user/edit', {
				user: user
			});
		});
	},

	/**
	 * Modificar la información de un usuario
	 *
	 * @param  {object}   req  HttpRequest
	 * @param  {object}   res  HttpResponse
	 * @param  {Function} next Callback
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
	}

};
