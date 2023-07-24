interface IMailServiceProps {
  to: string
  subject: string
  body: string
  html?: string
}

interface IMailService {
  sendMail(props: IMailServiceProps): Promise<void>
}

export { IMailService }
