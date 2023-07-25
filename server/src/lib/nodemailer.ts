import 'dotenv/config'
import Nodemailer from 'nodemailer'

const host = process.env.SMTP_HOST
const port = process.env.SMTP_PORT
const user = process.env.SMTP_USERNAME
const pass = process.env.SMTP_PASSWORD

const transporter = () => {
  if (!host || !port || !user || !pass)
    throw new Error(
      'SMTP credentials not provided on environment variables: HOST, PORT, USER, PASS',
    )

  return Nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  } as { host: string })
}

const nodemailer = transporter()

export { nodemailer }
