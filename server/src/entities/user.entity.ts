interface User {
  id: string;
  fullName: string;
  username: string;
  email: string
  emailVerified: boolean;
  password: string;
  biography: string;
  profilePicture: string;

  images?: any[]
  posts?: any[]
  comments?: any[]
  postReactions?: any[]
  commentReactions?: any[]
}

export { User };
