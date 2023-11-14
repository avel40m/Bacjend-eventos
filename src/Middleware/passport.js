const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = 'secretkey';

passport.use(new JwtStrategy(opt, (jwtPayload, done) => {
        const { rol,username } = jwtPayload;
        if (rol != 'ADMIN') {
           return done(null,false)
        }
        return done(null,username)
}))