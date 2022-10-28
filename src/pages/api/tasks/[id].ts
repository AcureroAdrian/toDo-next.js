import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(400).json("Task not found");
        return res.status(200).json(task);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, { new: true });
        if (!task) return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    case "DELETE":
      try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ msg: "Task not found" });
        return res.status(204).json("Done");
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
};
