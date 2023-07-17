interface Post {
  id: string;
  subTitle: string;
  comments?: any[];
  reactions?: any[];
  userId: string;
  imageId: string;
}

export { Post };
