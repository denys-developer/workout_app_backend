import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { generateAuthTokens } from '@/helpers';
import User from '@/models/user';
import { envUtil } from '@/utils';

const {
  google: { clientID, clientSecret },
} = envUtil.getEnv();

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const email = profile.emails[0].value;
        const picture = profile.photos[0].value;
        user = new User({
          googleId: profile.id,
          email,
          picture,
        });
        await user.save();
      }
      const tokens = generateAuthTokens(user._id);

      return done(null, tokens);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
