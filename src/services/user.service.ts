import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";

const userService = {
  getAll: async () => {
    const allUsers = await userRepository.getAll();

    if (!allUsers) throw new Error("users db is empty");

    return allUsers;
  },

  getOne: async (userdata: { id?: string; email?: string }) => {
    const user = await userRepository.getOne(userdata);

    if (!user) throw new Error("no user found");

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
    const existingUser = await userRepository.getOne({ email });
    if (existingUser) throw new Error("email already registered");

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_ROUND as string)
    );

    const newUser = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  },
  update: async (
    id: string,
    userdata: { username?: string; email?: string; password?: string }
  ) => {
    const { password } = userdata;

    // if updated data is the password, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUND as string)
      );
      userdata.password = hashedPassword;
    }

    const updatedUser = await userRepository.update(id, userdata);

    return updatedUser;
  },
  delete: async (id: string) => {
    const deletedUser = await userRepository.delete(id);
    return deletedUser;
  },
};

export default userService;
