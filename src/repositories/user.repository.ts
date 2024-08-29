// db model
import mongoose from "mongoose";
import { UserInterface, UserUpdateInterface } from "../types/entity";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("User", userSchema);

// // basic db interaction
// const userRepository = {
//   getAll: async () => {
//     return await userModel.find();
//   },

//   getOne: async (userdata: {
//     username?: string;
//     email?: string;
//     _id?: string;
//   }) => {
//     return await userModel.findOne(userdata);
//   },

//   create: async (userdata: {
//     username: string;
//     email: string;
//     password: string;
//   }) => {
//     return await new userModel(userdata).save();
//   },

//   update: async (
//     id: string,
//     userdata: { username?: string; email?: string; _id?: string }
//   ) => {
//     return await userModel.findOneAndUpdate({ _id: id }, userdata, {
//       new: true,
//     });
//   },

//   delete: async (id: string) => {
//     const deletedUser = await userModel.findOneAndDelete({ _id: id });

//     if (!deletedUser) {
//       throw new Error("user not found");
//     }

//     return deletedUser;
//   },
// };

// export default userRepository;

export async function getUsers(filter: {
  _id?: string;
  email?: string;
  username?: string;
}) {
  const users = userModel.find(filter).exec();
  return users;
}

export async function createUser(data: UserInterface) {
  const newUser = await new userModel(data).save();
  return newUser;
}

export async function updateUser(data: {
  _id: string;
  updateData: UserUpdateInterface;
}) {
  const { _id, updateData } = data;

  const updatedUser = await userModel.findOneAndUpdate({ _id }, updateData, {
    new: true,
  });
  return updatedUser;
}

export async function deleteUser(_id: string) {
  const deletedUser = await userModel.findOneAndDelete({ _id });
  return deletedUser;
}
