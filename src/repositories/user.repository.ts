// db model
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("User", userSchema);

// basic db interaction
const userRepository = {
  getAll: async () => {
    return await userModel.find();
  },
  getOne: async (userdata: {
    username?: string;
    email?: string;
    _id?: string;
  }) => {
    return await userModel.findOne(userdata);
  },
  create: async (userdata: {
    username: string;
    email: string;
    password: string;
  }) => {
    return await new userModel(userdata).save();
  },
  update: async (
    id: string,
    userdata: { username?: string; email?: string; _id?: string }
  ) => {
    return await userModel.updateOne({ _id: id }, userdata);
  },
  delete: async (id: string) => {
    return await userModel.deleteOne({ id: id });
  },
};

export default userRepository;
