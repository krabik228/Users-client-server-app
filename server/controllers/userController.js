import ApiError from '../error/ApiError.js';
import User from '../models/models.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'

const generateJwt = (id, email) => {
    return jsonwebtoken.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class userController {
    async registration(req, res, next) {
        const { email, password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email/password'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('email зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password: hashPassword })
        const token = generateJwt(user.id, user.email)
        return res.json({ token })

    }
    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password!'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({ token })
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({ token })
    }
    async getRandomUsers(req, res) {
        let users = await User.findAll()
        return res.json(users)
    }

}

export default new userController()