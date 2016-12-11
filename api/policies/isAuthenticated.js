/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Acceder si el usuario está logueado.
 */

module.exports = function (req, res, next) {
  if (!req.session.authenticated) {
    return next();
  }

  return res.redirect(`/user/show/${req.session.user.id}`);
};
