import 'dotenv/config'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'

const apiKey = process.env.MAILGUN_API_KEY

const mailgun = new Mailgun(FormData)

const MailgunClient = () => {
  if (!apiKey) throw new Error('Missing MAILGUN_API_KEY')

  return mailgun.client({
    username: 'MinIG',
    key: apiKey,
  })
}

export { MailgunClient }
