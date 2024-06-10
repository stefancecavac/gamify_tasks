import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getAllTasks = async(req:Request, res:Response)=>{
    const id = req.user.id
    
    try {
        const allTasks = await prisma.tasks.findMany({
            where:{
                userId:id
            }
        })

        if(allTasks.length === 0){
            return res.status(200).json(allTasks)
        }

        res.status(200).json(allTasks)
    } catch (error) {
        console.log(`Something went wrong fetching tasks` , error)
        res.status(500).json({message: `Something went wrong`})
    }
}

const getSingleTask = async(req:Request, res:Response)=>{
    const id = parseInt(req.params.id)


    try {
        const singleTask = await prisma.tasks.findMany({
            where: {id:id} 
        })

        if(!singleTask){
            return res.status(404).json({message: 'No tasks found with that id!'})
        }

        res.status(200).json(singleTask)
    } catch (error) {
        console.log(`Something went wrong fetching tasks` , error)
        res.status(500).json({message: `Something went wrong`})
    }
}

const createTask = async (req:Request , res:Response) => {
    const {title , content} = req.body
    const id = req.user.id

    try {
         const task = await prisma.tasks.create({
            data:{
                title:title,
                content:content,
                userId:id
            }
         })   

        res.status(201).json(task)
        
    } catch (error) {
        console.log(`Something went wrong creating tasks` , error)
        res.status(500).json({message: `Something went wrong`}) 
    }
}

const deleteTask = async (req:Request , res:Response) => {
    const id = parseInt(req.params.id)

    try {
        const deleted = await prisma.tasks.deleteMany({
            where:{
                id:id
            }
        })

        if(deleted.count === 0){
            return res.status(404).json({message: 'No task with that id'})
        }

        res.status(200).json(deleted)
    } catch (error) {
        console.log(`Something went wrong deleting tasks` , error)
        res.status(500).json({message: `Something went wrong`}) 
    }

}


export {getAllTasks ,getSingleTask , createTask ,deleteTask}