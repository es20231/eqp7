import { randomBytes } from 'crypto'

const generateRandomId = () => randomBytes(16).toString('hex')

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

export { delay, generateRandomId }
