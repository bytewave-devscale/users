import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.midlleware";

const userRouter = Router();

userRouter.get("/", userController.handleGetAll);
userRouter.get("/email/:email", userController.handleGetOneByEmail);
userRouter.get("/:id", userController.handleGetOne);

userRouter.post("/", userController.handleCreate);

userRouter.patch("/", authMiddleware, userController.handleUpdate);

userRouter.delete("/", authMiddleware, userController.handleDelete);

export default userRouter;
