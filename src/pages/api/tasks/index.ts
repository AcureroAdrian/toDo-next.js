import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from 'utils/mongoose'
import Task from 'models/Task'

dbConnect()

export default async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {

    const { method, body } = req

    switch (method) {

      
      case 'GET':
        try {
          const tasks = await Task.find()
          return res.status(200).json(tasks)
        } catch (error: any) {
          console.log(error)
          return res.status(500).json({ error: error.message})
        }
    
      case 'POST':

      try {
        const newTask = new Task(body)
        const savedTask = await newTask.save()
        return res.status(201).json(savedTask)
      } catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: error.message})
      }

        
      default:
        return res.status(400).json({msg: 'this method is not supported'})
    }
  }