interface Post {
  id: string;
  subTitle: string;
  userId: string;
  imageId: string;

  //fixme: change any to the correct type
  comments?: any[];
  reactions?: any[];
}

export { Post };
