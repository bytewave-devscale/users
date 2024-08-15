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
    return await userModel.findOneAndUpdate({ _id: id }, userdata, {
      new: true,
    });
  },

  delete: async (id: string) => {
    const deletedUser = await userModel.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      throw new Error("user not found");
    }

    return deletedUser;
  },
};

export default userRepository;
