import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getAllTasks = async (req: Request, res: Response) => {
    const id = req.user.id

    try {
        const allTasks = await prisma.tasks.findMany({
            where: {
                userId: id
            }
        })

        if (allTasks.length === 0) {
            return res.status(200).json(allTasks)
        }

        res.status(200).json(allTasks)
    } catch (error) {
        console.log(`Something went wrong fetching tasks`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}

const getSingleTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)


    try {
        const singleTask = await prisma.tasks.findMany({
            where: { id: id }
        })

        if (!singleTask) {
            return res.status(404).json({ message: 'No tasks found with that id!' })
        }

        res.status(200).json(singleTask)
    } catch (error) {
        console.log(`Something went wrong fetching tasks`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}

const createTask = async (req: Request, res: Response) => {
    const { title, content, difficulty } = req.body
    const id = req.user.id

    try {
        const task = await prisma.tasks.create({
            data: {
                title: title,
                content: content,
                userId: id,
                difficulty: difficulty
            }
        })

        res.status(201).json(task)

    } catch (error) {
        console.log(`Something went wrong creating tasks`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}

const calculateXp = (difficulty: string) => {
    switch (difficulty) {
        case 'easy':
            return 10
        case 'medium':
            return 20
        case 'hard':
            return 30
        default:
            return 0
    }
};

const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const userId = req.user.id

    try {
        const task = await prisma.tasks.findUnique({ where: { id: id } })

        if (!task) {
            return res.status(404).json({ message: 'No task found' })
        }

        const xpEarned = calculateXp(task.difficulty);

        const user = await prisma.users.findUnique({ where: { id: userId } })

        if (!user) {
            return res.status(404).json({ message: 'No user found' })
        }

        await prisma.$transaction([
            prisma.tasks.delete({ where: { id: id } }),
            prisma.users.update({
                where: { id: userId },
                data: {
                    experience_points: Math.max(0, user.experience_points - xpEarned)
                }
            })
        ]);

        res.status(200).json({ message: 'Task deleted successfully', xpEarned })

    } catch (error) {
        console.error('Something went wrong deleting tasks', error)
        res.status(500).json({ message: 'Something went wrong' })
    }
};

const completeTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const userId = req.user.id

    try {
        const task = await prisma.tasks.findUnique({ where: { id: id } })

        if (!task) {
            return res.status(404).json({ message: 'No task found' })
        }

        const xpEarned = calculateXp(task.difficulty)

        const user = await prisma.users.findUnique({ where: { id: userId } })

        if (!user) {
            return res.status(404).json({ message: 'No user found' })
        }

        const completedTask = await prisma.tasks.deleteMany({
            where: { id: id }, 
        });

        await prisma.users.update({
            where: { id: userId },
            data: {
                experience_points: user.experience_points + xpEarned
            }
        });

        res.status(200).json( xpEarned )

    } catch (error) {
        console.error('Something went wrong completing tasks', error)
        res.status(500).json({ message: 'Something went wrong' })
    }
};


export { getAllTasks, getSingleTask, createTask, deleteTask ,completeTask }