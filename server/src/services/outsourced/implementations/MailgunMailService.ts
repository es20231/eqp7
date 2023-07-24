import 'dotenv/config'
import { MailgunClient } from '../../../lib/mailgun'
import { IMailService } from '../IMailService'

const MailgunMailService: IMailService = {
  sendMail: async ({ body, subject, to, html }) => {
    const mailgun = MailgunClient()

    await mailgun.messages
      .create('sandbox5c6e0e8cafc143a89e3a15eb107b8d9d.mailgun.org', {
        from: 'MinIG <mailgun@sandbox5c6e0e8cafc143a89e3a15eb107b8d9d.mailgun.org>',
        to,
        subject,
        text: body,
        html,
      })
      .catch((err) => {
        console.log('Mailgun error: ', err)
      })
  },
}

export { MailgunMailService }
