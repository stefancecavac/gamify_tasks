import {z} from 'zod'



export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1 , {message:'Field must not be empty'}).max(20 , {message: 'Max 20 characters'}),
    content: z.string().min(1 , {message:'Field must not be empty'}).max(100, {message: 'Max 100 characters'}),
    difficulty: z.enum(['easy', 'medium', 'hard']), 
    createdAt: z.date().default(() => new Date), 
    updatedAt: z.date().default(() => new Date)
})

export const userSchema = z.object({
    id: z.number().optional(),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Not a valid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
    user_name: z.string().min(3, { message: 'User name must be at least 3 characters long' }).max(50, { message: 'User name must be at less than 50 characters long' }).optional(),
    experience_points: z.number().default(0),
});

export type taskData = z.infer<typeof taskSchema>;
export type userData = z.infer<typeof userSchema>;


