interface Post {
  id: string;
  subTitle: string;
  userId: string;
  ImageId: string;

  //fixme: change any to the correct type
  comments?: any[];
  reactions?: any[];
}
