interface Image {
  id: string
  url: string
  userId: string

  // FIXME: change any[] to Post[] after model and entity Post is created
  posts?: any[]
}

export { Image }
