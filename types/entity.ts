export interface UserInterface {
  username: string;
  email: string;
  password: string;
}

export interface UserUpdateInterface {
  username?: string;
  email?: string;
  password?: string;
}
