import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const registerUser = async (req: Request, res: Response) => {
    const { user_name, email, password } = req.body

    if (!validator.isEmail(email)) {
        return res.status(200).json({ message: 'Not a valid email' })
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        return res.status(400).json({ message: 'Not a strong password' })
    }
    try {
        const emailExists = await prisma.users.findUnique({
            where: { email: email }
        })

        if (emailExists) {
            return res.status(400).json({ message: 'Email already in use' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.users.create({
            data: {
                user_name: user_name,
                email: email,
                password: hashedPassword
            }
        })


        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            console.error('JWT secret is not defined.')
            return res.status(500).json({ message: 'Internal server error' })
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 86400
        })

        res.status(201).json(user)
    } catch (error) {
        console.log('Something went wrong registering user', error)
        return res.status(500).json({ message: 'Something went wrong register user' })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await prisma.users.findUnique({
            where: { email: email }
        })
        if (!user) {
            return res.status(200).json({ message: 'Wrong email' })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(200).json({ message: 'Wrong password' })
        }

        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            console.error('JWT secret is not defined.')
            return res.status(500).json({ message: 'Internal server error' })
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 864000
        })

        res.status(200).json(user)

    } catch (error) {
        console.log('Something went wrong logging user', error)
        return res.status(500).json({ message: 'Something went wrong logging user' })
    }

}


const logoutUser = async (req:Request , res:Response) => {
    res.clearCookie('token')
    res.status(201).json({message: 'User logged out'})
}

export { registerUser, loginUser ,logoutUser }