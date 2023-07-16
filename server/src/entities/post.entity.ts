interface Post {
  id: string;
  subTitle: string;
  comments?: any[];
  reactions?: any[];
  user_id: string;
  image_id: string;
}

export { Post };
