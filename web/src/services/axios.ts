import axios from 'axios'

const baseURL = process.env.API_URL || 'http://localhost:3333'

const api = (token?: string) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })

export { api }
