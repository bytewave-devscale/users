import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  handleGetAll: async (_: Request, res: Response) => {
    const allUsers = await userService.getAll();
    return res.status(200).json({ users: allUsers });
  },

  handleGetOne: async (req: Request, res: Response) => {
    try {
      const user = await userService.getOne({ id: req.params.id });
      return res.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
    }
  },
};

export default userController;
