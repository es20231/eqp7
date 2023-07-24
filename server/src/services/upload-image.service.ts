import { instantiateDropbox } from '../lib/dropbox'
import { generateRandomId } from '../utils'
import { ServiceResult } from './result'

interface IUploadImageService {
  upload: (
    file: any,
    filename: string,
  ) => Promise<ServiceResult<{ url: string; deleteInfo: string }>>
  delete: (deleteInfo: string) => Promise<ServiceResult<undefined>>
}

const DropboxUploadImageService: IUploadImageService = {
  upload: async (file, filename) => {
    const { ok, payload: dropbox } = await instantiateDropbox()

    if (!ok || !dropbox) {
      return {
        ok: false,
        message: 'Error on instantiate dropbox',
        payload: undefined,
      }
    }

    try {
      const [name, extension] = filename.split('.')

      const path = `/${generateRandomId()}_${name}.${extension}`

      const upload = await dropbox.filesUpload({
        path,
        contents: file,
      })

      const dbxImageId = upload.result.id

      const share = await dropbox.sharingCreateSharedLinkWithSettings({
        path: dbxImageId,
      })

      const url = share.result.url.replace('dl=0', 'raw=1')

      return {
        ok: true,
        message: 'Image uploaded successfully',
        payload: { url, deleteInfo: path },
      }
    } catch (err) {
      console.log('error', err)
      return {
        ok: false,
        message: 'Error on upload image',
        payload: undefined,
      }
    }
  },
  delete: async (deleteInfo) => {
    const { ok, payload: dropbox } = await instantiateDropbox()

    if (!ok || !dropbox) {
      return {
        ok: false,
        message: 'Error on instantiate dropbox',
        payload: undefined,
      }
    }

    try {
      await dropbox.filesDeleteV2({ path: deleteInfo })

      return {
        ok: true,
        message: 'Image deleted successfully',
        payload: undefined,
      }
    } catch (err) {
      console.log('error', err)
      return {
        ok: false,
        message: 'Error on delete image',
        payload: undefined,
      }
    }
  },
}

export { DropboxUploadImageService }
