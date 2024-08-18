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

  handleGetOneByEmail: async (req: Request, res: Response) => {
    try {
      const user = await userService.getOne({ email: req.params.email });
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
      return res
        .status(201)
        .json({ message: "user created successfully", user: newUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },

  handleUpdate: async (req: Request, res: Response) => {
    try {
      const updatedUser = await userService.update(req.params.id, req.body);
      return res
        .status(201)
        .json({ message: "user updated successfully", user: updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },

  handleDelete: async (req: Request, res: Response) => {
    try {
      const deletedUser = await userService.delete(req.params.id);
      return res
        .status(201)
        .json({ message: "user deleted successfully", user: deletedUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },
};

export default userController;
