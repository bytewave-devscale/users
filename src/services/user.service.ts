import * as userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";

const userService = {
  getAll: async () => {
    const allUsers = await userRepository.getUsers({});
    return allUsers;
  },

  getUserbyId: async (_id: string) => {
    const user = await userRepository.getUsers({ _id });

    if (!user) throw new Error("user not found");

    return user;
  },

  getUserbyEmail: async (email: string) => {
    const user = await userRepository.getUsers({ email });

    if (!user) throw new Error("user not found");

    return user;
  },

  create: async (userdata: {
    username: string;
    email: string;
    password: string;
  }) => {
    const { username, email, password } = userdata;

    // input validation
    if (!username) throw new Error("username must be provided");
    if (!email) throw new Error("email must be provided");
    if (!password) throw new Error("password must be provided");
    if (password.length < 8)
      throw new Error("password must be at least 8 characters");

    // collision check
    const existingUser = await userRepository.getUsers({ email });
    if (existingUser) throw new Error("email already registered");

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_ROUND as string)
    );

    const newUser = await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  },

  update: async (
    _id: string,
    updateData: { username?: string; email?: string; password?: string }
  ) => {
    const { password } = updateData;

    // if updated data is the password, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUND as string)
      );
      updateData.password = hashedPassword;
    }

    const updatedUser = await userRepository.updateUser({ _id, updateData });

    return updatedUser;
  },
  delete: async (_id: string) => {
    const deletedUser = await userRepository.deleteUser(_id);
    return deletedUser;
  },
};

export default userService;
