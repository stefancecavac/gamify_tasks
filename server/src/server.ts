import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieparser from 'cookie-parser'
dotenv.config()
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cookieparser())
app.use(cors(corsOptions))
app.use(express.json())

import taskRouter from './routes/taskRouter'
import userRouter from './routes/userRouter'

app.use('/api/tasks' , taskRouter)
app.use('/api/users' , userRouter)


app.listen(process.env.PORT , () => {
    console.log('server has started')
})