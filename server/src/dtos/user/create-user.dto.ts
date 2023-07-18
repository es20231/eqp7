type CreateUserDTO = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  biography?: string;
  profilePicture?: string;
};

export { CreateUserDTO };
