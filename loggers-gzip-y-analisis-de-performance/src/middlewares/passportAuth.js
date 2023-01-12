import { config } from '../config/index.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { UserDao } from "../dao/index.js";
import { BCRYPT_VALIDATION, ERRORS_UTILS } from '../utils/index.js';

const init = () => {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserDao.getById(id)
        done(null, user)
    })

    const init = () => {

        passport.serializeUser((user, done) => {
            done(null, user.id)
        })
    
        passport.deserializeUser(async (id, done) => {
            const user = await UserDao.getById(id)
            done(null, user)
        })
    
        passport.use("login", new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        }, async (req, email, password, done) => {
            try {
                if (!email || !password) return done(null, false)
                const user = await UserDao.getOne({ email: email })
    
                if (!user) {
                    console.log(`Password or user not valid user`);
                    return done(null, false)
                }
    
                if (BCRYPT_VALIDATION.isValidPassword(password, user) != true) {
                    console.log(`Password or user not valid pass`);
                    return done(null, false)
                }
    
                const userResponse = {
                    id: user._id,
                    email: user.email,
                    cart: user.cart,
                };
    
                done(null, userResponse)
    
            } catch (error) {
                res.send({ sucess: false, message: ERRORS_UTILS.USERS.NO_USER_OR_PASSWORD })
                console.log(`error from middlewares/passportAuth - LocalStrategy`)
                done(error)
            }
        }))}}


        export const PassportAuth = {
            init,
        }