import { UserUpdateInterface } from "./../../types/entity";
import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  handleGetAll: async (_: Request, res: Response) => {
    const allUsers = await userService.getAll();
    return res.status(200).json({ users: allUsers });
  },

  handleGetOne: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserbyId(req.params.id);
      return res.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
    }
  },

  handleGetOneByEmail: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserbyEmail(req.params.email);
      return res.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
    }
  },

  handleCreate: async (req: Request, res: Response) => {
    try {
      const newUser = await userService.create(req.body);
      return res.status(201).json({ newUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },

  handleUpdate: async (req: Request, res: Response) => {
    const _id = req.body.authData.UserUpdateInterface;
    const updateData = { ...req.body };
    delete updateData.authData;

    try {
      const updatedUser = await userService.update(_id, updateData);
      return res.status(201).json({ updatedUser, authData: req.body.authData });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },

  handleDelete: async (req: Request, res: Response) => {
    const _id = req.body.authData.userId;
    try {
      const deletedUser = await userService.delete(_id);
      return res.status(201).json({ deletedUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },
};

export default userController;
