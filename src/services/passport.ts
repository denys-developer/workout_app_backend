import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '@/models/user';
import { envUtil } from '@/utils';

const {
  google: { clientID, clientSecret },
  jwtAccessSecret,
} = envUtil.getEnv();

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        const id = existingUser._id.toString();
        const token = jwt.sign({ id }, jwtAccessSecret);
        return done(null, token);
      } else {
        const email = profile.emails[0].value;
        const picture = profile.photos[0].value;
        const newUser = new User({
          googleId: profile.id,
          email,
          picture,
        });
        await newUser.save();
        const id = newUser._id.toString();
        const token = jwt.sign({ id }, jwtAccessSecret);
        return done(null, token);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
