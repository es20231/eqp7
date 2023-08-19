'use client'

import { api } from '@/services/axios'
import { queryClient } from '@/services/queryClient'
import * as Dialog from '@radix-ui/react-dialog'
import * as Progress from '@radix-ui/react-progress'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import {
  CheckCircle2,
  FileUp,
  FileWarning,
  Image as ImageIcon,
  ImagePlus,
  X,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'
import { Text } from './Text'
import { Title } from './Title'

interface UploadImageProps {
  userId: string
  token: string
}

type FileUpload = {
  file: File
  id: string
  name: string
  previewUrl: string
  size: number
  progress: number
  uploaded: boolean
  error: boolean
  url: string | undefined
}

const UploadImage = ({ userId, token }: UploadImageProps) => {
  const [files, setFiles] = useState<FileUpload[]>([])

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      URL.revokeObjectURL(file.previewUrl)
    })
    setFiles([])
    queryClient.invalidateQueries(['images', { userId, token }])
  }, [])

  return (
    <div>
      <Dialog.Root
        onOpenChange={() => {
          if (files.length > 0) clearFiles()
        }}
      >
        <Dialog.Trigger asChild>
          <Button rightIcon={<ImagePlus className="text-slate-50" size={24} />}>
            Nova imagem
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
            <Dialog.Title className="text-xl font-bold w-full pt-8 px-8">
              <Title className="text-left">Nova imagem</Title>
            </Dialog.Title>
            <Dialog.Description className="px-8 w-full">
              <Text className="text-left">
                Escolha uma imagem para realizar o upload.
              </Text>
            </Dialog.Description>
            <div className="flex flex-col items-center justify-start p-8 w-full max-h-full h-[60vh] gap-8">
              <UploadComponent
                setFiles={setFiles}
                uploadProps={{ userId, token }}
              />
              <div className="w-full">
                <div className="flex flex-col gap-8 items-center justify-start h-[80%]">
                  <Title>Imagens selecionadas</Title>
                  {files.length > 0 ? (
                    <FileList files={files} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
                      <ImageIcon
                        className="text-zinc-400"
                        size={64}
                        strokeWidth={1.5}
                      />
                      <Text className="text-center text-zinc-400 dark:text-zinc-400">
                        O preview das imagens que você selecionar aparecerá
                        aqui.
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Dialog.Close className="absolute top-8 right-8 p-2">
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

interface UploadComponentProps {
  setFiles: React.Dispatch<React.SetStateAction<FileUpload[]>>
  uploadProps: { userId: string; token: string }
}

const UploadComponent = ({
  setFiles,
  uploadProps: { userId, token },
}: UploadComponentProps) => {
  const [error, setError] = useState('')

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setTimeout(() => setError(''), 3000)
        setError(
          'Um ou mais arquivos inválidos. Selecione apenas imagens. (png, jpg, jpeg)',
        )
        return
      }

      if (acceptedFiles.length > 0) {
        const filesExccededLimit =
          acceptedFiles.filter((file) => file.size / 1024 / 1024 > 10).length >
          0

        if (filesExccededLimit) {
          setTimeout(() => setError(''), 3000)
          setError('Um ou mais arquivos excederam o limite de 10MB.')
          return
        }
      }

      const filesToUpload = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).slice(2, 9),
        name: file.name,
        size: file.size / 1024 / 1024, // MB
        previewUrl: URL.createObjectURL(file),
        uploaded: false,
        error: false,
        progress: 0,
        url: undefined,
      }))

      setFiles((prev) =>
        prev.length ? [...prev, ...filesToUpload] : filesToUpload,
      )

      for await (const file of filesToUpload) {
        const formData = new FormData()

        formData.append('file', file.file)
        formData.append('userId', userId)

        api(token)
          .post('images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (e) => {
              const progress = Math.round((e.loaded * 100) / (e.total || 1))

              setFiles((prev) =>
                prev.map((prevFile) =>
                  prevFile.id === file.id
                    ? { ...prevFile, progress }
                    : prevFile,
                ),
              )
            },
          })
          .then((response) => {
            setFiles((prev) =>
              prev.map((prevFile) =>
                prevFile.id === file.id
                  ? {
                      ...prevFile,
                      uploaded: true,
                      url: response.data.payload.url,
                    }
                  : prevFile,
              ),
            )
          })
          .catch((err) => {
            console.log(err)
            setFiles((prev) =>
              prev.map((prevFile) =>
                prevFile.id === file.id
                  ? { ...prevFile, error: true }
                  : prevFile,
              ),
            )
          })
      }

      queryClient.invalidateQueries(['images', { token, userId }])
    },
    [],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    onDrop,
  })

  return (
    <div
      {...getRootProps({ className: 'dropzone', onClick: () => setError('') })}
      className="max-w-[50vw] max-h-[15vh] h-full w-full flex flex-col items-center justify-center"
    >
      <input {...getInputProps()} />

      <div
        className={twMerge(
          'w-full h-full border-dashed border-2 dark:border-gray-300 border-dark-slate-gray-500 rounded-md cursor-pointer data-[isdragaccept=true]:border-pacific-blue-500 hover:bg-slate-200 dark:hover:bg-dark-slate-gray-500 transition-colors',
          `${error !== '' && 'border-red-500 dark:border-red-500'}`,
        )}
        data-isdragaccept={isDragActive}
      >
        <div className="flex flex-col items-center justify-center h-full w-full gap-2">
          {error ? (
            <FileWarning className="text-red-500" size={64} strokeWidth={1.5} />
          ) : (
            <FileUp
              className="text-zinc-600 dark:text-slate-50"
              size={64}
              strokeWidth={1.5}
            />
          )}
          <Text className="text-center text-xl">
            {!error &&
              (isDragActive
                ? 'Solte a(s) imagem(s) aqui...'
                : 'Arraste e solte a(s) imagem(s) aqui, ou clique para selecionar')}
            {error && error}
          </Text>
        </div>
      </div>
    </div>
  )
}

interface FileListProps {
  files: FileUpload[]
}

const FileList = ({ files }: FileListProps) => {
  return (
    <ScrollArea.Root className="w-full h-[55%] min-h-full">
      <ScrollArea.Viewport className="w-full h-full px-4 py-2">
        <div className="grid grid-cols-3 gap-4 w-full h-full">
          {files.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

interface FileItemProps {
  file: FileUpload
}

const FileItem = ({ file }: FileItemProps) => {
  return (
    <div className="flex items-center gap-2 w-full bg-slate-100 dark:bg-dark-slate-gray-500 p-2 rounded-md">
      <Preview url={file.previewUrl} />
      <div className="flex flex-col items-start justify-center gap-2 grow">
        <Text className="text-xs text-start">
          {file.name.length > 10
            ? file.name.slice(0, 10).concat('...')
            : file.name}
        </Text>
        <Text className="text-sm text-start text-zinc-400 dark:text-zinc-400">
          {file.size.toFixed(2)} MB
        </Text>
      </div>
      <div className="flex items-center justify-end w-full max-w-[30%] grow">
        {!file.uploaded && !file.error && (
          <Progress.Root
            className="relative overflow-hidden bg-slate-500 rounded-full w-full h-2"
            value={file.progress}
          >
            <Progress.Indicator
              className="bg-pacific-blue-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
              style={{ transform: `translateX(-${100 - file.progress}%)` }}
            />
          </Progress.Root>
        )}
        {file.uploaded && (
          <div className="p-1 flex items-center justify-center bg-pacific-blue-500 rounded-full">
            <CheckCircle2 className="text-slate-50" size={24} strokeWidth={2} />
          </div>
        )}
        {file.error && (
          <div className="p-1 flex items-center justify-center bg-red-500 rounded-full">
            <XCircle className="text-slate-50" size={24} strokeWidth={2} />
          </div>
        )}
      </div>
    </div>
  )
}

interface PreviewProps {
  url: string
}

const Preview = ({ url }: PreviewProps) => {
  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden">
      <Image
        src={url}
        alt="Preview"
        width={50}
        height={50}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export { UploadImage }
