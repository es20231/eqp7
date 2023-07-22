import 'dotenv/config'
import { Dropbox } from 'dropbox'

const dropbox = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
})

export { dropbox }
