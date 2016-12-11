/**
 * authenticationRequired
 *
 * @module      :: Policy
 * @description :: Politica de autentificación requerida.
 */
module.exports = function (req, res, next) {
  if (req.session.authenticated) {
    return next();
  }

  return res.redirect('/session/new');
};
