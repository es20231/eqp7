import axios from 'axios'
import 'dotenv/config'
import { Dropbox } from 'dropbox'

const refresh = process.env.DROPBOX_REFRESH_TOKEN
const appSecret = process.env.DROPBOX_APP_SECRET
const appKey = process.env.DROPBOX_APP_KEY

type AccessObjectProps = {
  expiresAt: number
  accessToken: string
}

let accessObject: AccessObjectProps

const getAccessToken = async () => {
  if (!refresh || !appSecret || !appKey) {
    console.log('Missing environment variables')
    return {
      ok: false,
      payload: undefined,
    }
  }

  const { data } = await axios.post(
    'https://api.dropbox.com/oauth2/token',
    new URLSearchParams({
      refresh_token: refresh,
      grant_type: 'refresh_token',
      client_id: appKey,
      client_secret: appSecret,
    }),
  )

  accessObject = {
    expiresAt: Date.now() + data.expires_in * 1000,
    accessToken: data.access_token,
  }

  return { ok: true, payload: data.access_token }
}

const instantiateDropbox = async () => {
  if (accessObject && accessObject.expiresAt > Date.now()) {
    return {
      ok: true,
      payload: new Dropbox({
        accessToken: accessObject.accessToken,
      }),
    }
  }

  const { ok, payload } = await getAccessToken()

  if (!ok || !payload) {
    console.log('Error getting access token')
    return {
      ok: false,
      payload: undefined,
    }
  }

  return {
    ok: true,
    payload: new Dropbox({
      accessToken: payload,
    }),
  }
}

export { instantiateDropbox }
