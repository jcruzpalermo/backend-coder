import { UserDao } from "../../dao/index.js";
import { BCRYPT_VALIDATION } from "../../utils/bcrypt.js";
import logger from "../../loggers/Log4jsLogger.js"

const signUp = async (req, res) => {
    logger.info()
    try {

        const { name, lastname, email, password } = req.body

        if (!name || !lastname || !email || !password) return res.send({ success: false })

        const existUser = await UserDao.getOne({ email })

        if (existUser && existUser.password) {
            return res.send({ success: false, error: 'User already exists' })
        }

        if (existUser && !existUser.password) {
            const updateUser = await UserDao.updateById(existUser._id, { ...existUser, password })
            return res.send({ success: true })
        }

        await UserDao.save({ name, lastname, email, password: BCRYPT_VALIDATION.hashPassword(password) })

        res.send({ success: true })
    } catch (error) {
        console.log(`error from AuthRouter-Post`);
        res.send({ success: false })
    }
}

const githubLogin = (req, res) => {
    res.send({ success: true, message: 'Bienvenido desde github' })
}


export const AuthControllers = { signUp, githubLogin }