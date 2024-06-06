import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


declare module 'express' {
    interface Request {
      user?: any;
    }
  }

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    try {
        if (!token) {
            return res.status(404).json({ message: 'Not authorized' })
        }

        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            console.error('JWT secret is not defined.')
            return res.status(500).json({ message: 'Internal server error' })
        }
        const decodedToken = jwt.verify(token, jwtSecret)

        if (!decodedToken || typeof decodedToken === 'string') {
            return res.status(404).json({ message: 'Not a valid auth token' });
        }
        
        req.user = decodedToken 
        next()
    } catch (error) {
        console.log('somethin went wrong authorizing user', error)
        res.status(500).json({ message: 'something went wrong authorizing user' })
    }

}

export default authenticate