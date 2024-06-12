import {z} from 'zod'



export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1 , {message:'Field must not be empty'}).max(20 , {message: 'Max 20 characters'}),
    content: z.string().min(1 , {message:'Field must not be empty'}).max(100, {message: 'Max 100 characters'}),
    difficulty: z.enum(['easy', 'medium', 'hard']), 
    createdAt: z.date().default(() => new Date), 
    updatedAt: z.date().default(() => new Date)
})

export const registerSchema = z.object({
    id: z.number().optional(),
    user_name:z.string().min(3 , {message: 'User name must be at least 3 characters long'}).max(50,{message: 'User name must be at less than 50 characters long'}),
    email:z.string().email({message: 'Not a valid email'}),
    password:z.string().min(8, {message: 'Must be atLeast 8 characters'}),
    experience_points: z.number().default(0),
})

export const loginSchema = z.object({
    email: z.string().min(1 ,{ message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    experience_points: z.number().default(0),
})

export type taskData = z.infer<typeof taskSchema>;
export type registerData = z.infer<typeof registerSchema>;
export type loginData = z.infer<typeof loginSchema>;

