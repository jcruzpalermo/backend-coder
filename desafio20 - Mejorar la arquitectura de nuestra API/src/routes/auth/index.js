import { Router } from "express";
import passport from "passport";
import { AuthControllers } from "../../controllers/index.js";
import { IncorrectRoute } from "../../middlewares/index.js";

const router = Router()

//LOGIN
router.get('/login', AuthControllers.logInView)
router.post('/login', passport.authenticate('login', { failureRedirect: "/api/auth/login-error" }), AuthControllers.logInPost)

//SIGNUP
router.get('/signup', AuthControllers.sigUpView)
router.post('/signup', AuthControllers.signUp)

//LOGOUT
router.get('/logout', AuthControllers.logOutView)

//ERROR
router.get('/login-error', AuthControllers.logInError)
router.get('/signup-error', AuthControllers.userExist)

//WELCOME
router.get('/welcome', AuthControllers.welcome)

router.get('*', IncorrectRoute.errorRoutes)

export { router as AuthRouter }