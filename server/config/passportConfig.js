import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js'; // Import your User model here
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', 
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        console.log("Here in password")
        // Implement your authentication logic here
        let user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }
        // const isMatch =  bcrypt.compareSync(password, user.password)
        const hashPassword = await bcrypt.hash(password , user.salt)
        if(hashPassword !== user.password)
          return done(null, false, { message: 'Invalid credentials' });
        
        return done(null, user);
      } catch (err) {
        console.log("error",err);
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user (if needed)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
