import {z} from 'zod'



export const taskSchema = z.object({
    title: z.string(),
    content: z.string(),
    

})

export const registerSchema = z.object({
    user_name:z.string().min(3 , {message: 'User name must be at least 3 characters long'}).max(50,{message: 'User name must be at less than 50 characters long'}),
    email:z.string().email({message: 'Not a valid email'}),
    password:z.string().min(8, {message: 'Must be atLeast 8 characters'})
})

export const loginSchema = z.object({
    email: z.string().min(1 ,{ message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' })
})

export type taskData = z.infer<typeof taskSchema>;
export type registerData = z.infer<typeof registerSchema>;
export type loginData = z.infer<typeof loginSchema>;

