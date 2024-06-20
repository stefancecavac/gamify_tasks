import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getAllTasks = async (req: Request, res: Response) => {
    const id = req.user.id

    try {
        const allTasks = await prisma.tasks.findMany({
            where: {
                userId: id
            },
            include: {
                subTasks: true
            },
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
    const { title, subTasks } = req.body
    const id = req.user.id

    try {
        const task = await prisma.tasks.create({
            data: {
                title: title,
                userId: id,
                subTasks: {
                    create: subTasks
                },
            },
            include: { subTasks: true },
        });
        res.status(201).json(task)

    } catch (error) {
        console.log(`Something went wrong creating tasks`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}



const completeSubTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { completed } = req.body

    try {
        const subTask = await prisma.subTask.update({
            where: { id: id },

            data: {
                completed: completed,
            },
        })

        res.status(201).json(subTask)
    } catch (error) {
        console.log(`Something went wrong creating tasks`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}



const completeTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const userId = req.user.id

    try {
        const task = await prisma.tasks.findUnique({ where: { id: id } })

        if (!task) {
            return res.status(404).json({ message: 'No task found' })
        }


       

        const subTask = await prisma.subTask.findMany({
            where: {
                taskId: id
            }
        })

        const addCurrency = subTask.length

        const currenyEarned = 1 + addCurrency

        if (subTask.length > 0) {
            const subTaskComplete = await prisma.subTask.findMany({
                where: {
                    completed: true
                }
            })

            if (subTaskComplete.length === 0) {
                return res.status(400).json({ message: 'Must Complete all subtasks first!' })
            }
        }

        const user = await prisma.users.findUnique({
            where: { id: userId }
        })

        if (!user) {
            return res.status(404).json({ message: 'No user found' })
        }

        const completedTask = await prisma.tasks.deleteMany({
            where: { id: id },
        });

        await prisma.users.update({
            where: { id: userId },
            data: {
                currency: user.currency + currenyEarned
            }
        });

        res.status(200).json(currenyEarned)

    } catch (error) {
        console.error('Something went wrong completing tasks', error)
        res.status(500).json({ message: 'Something went wrong' })
    }
};


export { getAllTasks, getSingleTask, createTask, completeTask, completeSubTask }