const passport = require('passport');

exports.githubAuth = passport.authenticate('github');

exports.githubCallback = (req, res) => {
  res.redirect('/'); // Redirect to your frontend
};
