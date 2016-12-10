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
	}

};
