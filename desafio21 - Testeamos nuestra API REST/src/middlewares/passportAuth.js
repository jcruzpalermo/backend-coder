import { config } from '../config/index.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { UserDao } from "../dao/index.js";
import { AuthControllers } from '../controllers/AuthController/index.js';

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
    }, AuthControllers.login))
}
    export const PassportAuth = {
        init,
    }