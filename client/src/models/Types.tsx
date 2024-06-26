import {z} from 'zod'

export const subTaskSchema = z.object({
    id : z.number().optional(),
    title: z.string().max(50 , {message: 'Max 50 characters'}).optional(),
    completed: z.boolean().optional().default(false)
  });

export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1 , {message:'Field must not be empty'}).max(50 , {message: 'Max 50 characters'}),
    subTasks: z.array(subTaskSchema).optional(),
    createdAt: z.date().default(() => new Date), 
    updatedAt: z.date().default(() => new Date)
})

export const habbitSchema = z.object({
    id: z.number().optional(),
    streak: z.number().default(0),
    status: z.boolean().default(false),
    title: z.string().min(1 , {message:'Field must not be empty'}).max(50 , {message: 'Max 50 characters'}),
})


export const userSchema = z.object({
    id: z.number().optional(),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Not a valid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
    user_name: z.string().min(3, { message: 'User name must be at least 3 characters long' }).max(50, { message: 'User name must be at less than 50 characters long' }).optional(),
    currency:z.number().default(0)
});

export type subTaskData = z.infer<typeof subTaskSchema>;

export type taskData = z.infer<typeof taskSchema>;
export type habbitData = z.infer<typeof habbitSchema>;

export type userData = z.infer<typeof userSchema>;


