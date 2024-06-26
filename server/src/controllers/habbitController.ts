import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()



const getHabbits = async (req: Request, res: Response) => {
    const id = req.user.id
    try {
        const habbits = await prisma.habit.findMany({
            where: {
                userId: id
            }
        })
        if (habbits.length === 0) {
            return res.status(200).json(habbits)
        }

        res.status(200).json(habbits)
    } catch (error) {
        console.log(`Something went wrong fetching habbits`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}

const createHabbits = async (req: Request, res: Response) => {
    const { title } = req.body
    const id = req.user.id
    try {
        const habbits = await prisma.habit.create({
            data: {
                title: title,
                userId: id
            }
        })

        res.status(200).json(habbits)
    } catch (error) {
        console.log(`Something went wrong creating habbits`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}

const completeHabbit = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { status } = req.body
    const userId = req.user.id
    try {
        const habbits = await prisma.habit.update({
            where: { id: id },
            data: {
                status: status,
                streak: {increment: 1}
            }
        })

        //updating only on complted 
        if (habbits.status === true) {
            const currenyEarned = 2

            const user = await prisma.users.findUnique({
                where: { id: userId }
            })

            if (!user) {
                return res.status(404).json({ message: 'No user found' })
            }


            await prisma.users.update({
                where: { id: userId },
                data: {
                    currency: user.currency + currenyEarned
                }
            });
        }

        res.status(200).json(habbits)
    } catch (error) {
        console.log(`Something went wrong completing habbits`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}


const deleteHabit = async(req:Request , res:Response) => {
    const id = parseInt(req.params.id)

    try {
        const habbit = await prisma.habit.delete({
            where:{id:id}
        })

        res.status(200).json({message:'habbit deleted'})
        
    } catch (error) {
        console.log(`Something went wrong deleting habbits`, error)
        res.status(500).json({ message: `Something went wrong` })
    }
}

export { getHabbits, createHabbits, completeHabbit ,deleteHabit }