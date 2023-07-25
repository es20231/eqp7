import { nodemailer } from '../../../lib/nodemailer'
import { IMailService } from '../IMailService'

const NodemailerMailService: IMailService = {
  sendMail: async ({ body, subject, to, html }) => {
    nodemailer
      .sendMail({
        from: 'MinIG <cassianojunior@ufpi.edu.br>',
        to,
        subject,
        text: body,
        html,
      })
      .catch((err) => {
        console.log('Nodemailer error', err)
      })
  },
}

export { NodemailerMailService }
