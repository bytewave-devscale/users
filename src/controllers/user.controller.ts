import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  handleGetSelf: async (req: Request, res: Response) => {
    // expecting request body
    // {userId:string}
    const { userId } = req.body;
    const { username, email } = await userService.getOne({ id: userId });
    return res.status(200).json({ userId, username, email });
  },
  handleGetAll: async (req: Request, res: Response) => {
    console.log("handleGetAll");
    const allUsers = await userService.getAll();
    return res.status(200).json({ users: allUsers });
  },
};

export default userController;
