const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/userModel');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
  // Store or update user token in your database here
  let user = await User.findOne({ githubId: profile.id });
  if (!user) {
    user = new User({ githubId: profile.id, accessToken });
    await user.save();
  } else {
    user.accessToken = accessToken;
    await user.save();
  }
  done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
