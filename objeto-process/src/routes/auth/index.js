import { Router } from "express";
import passport from "passport";
import { AuthControllers } from "../../controllers/AuthController/index.js";


const router = Router()

router.post('/signup', AuthControllers.signUp)

router.post('/', passport.authenticate('login', { failureRedirect: "/login-error" }), async (req, res) => {
    res.send({ success: true, message: 'Logged succesfull', user: req.user })
})

router.get('/login-error', (req, res) => {
    res.send({ success: false, message: 'error in login' })
})

router.get('/github-login', passport.authenticate('github'), AuthControllers.githubLogin)

router.get('/github', passport.authenticate('github'), (req, res) => {
    res.send(req.user)
})



export { router as AuthRouter }