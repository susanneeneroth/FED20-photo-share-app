import { useState } from 'react'
import { db } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const useCreateAlbum = (images, album) => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isUploading, setIsUploading] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [progress, setProgress] = useState(null)

  const upload = async () => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsUploading(true)

    /* Create album */
    const albumUuid = uuidv4()

    const minTwoDigits = (n) => {
      return (n < 10 && n.length < 2 ? '0' : '') + n
    }
    var d = new Date(),
      dformat = [
        d.getFullYear(),
        minTwoDigits(d.getMonth()) + 1,
        minTwoDigits(d.getDate()),
        minTwoDigits(d.getHours()),
        minTwoDigits(d.getMinutes()),
        d.getSeconds(),
      ].join('')

    setDoc(doc(db, 'albums', albumUuid), {
      created: serverTimestamp(),
      user: album.user,
      name: `${album.name}-${dformat}`,
    })

    /* Upload images */
    images.map(async (image) => {
      if (!image instanceof File) {
        setError('Please upload a file')
        setIsError(true)
        setIsUploading(false)
        return
      }

      const imageUuid = uuidv4()
      try {
        await setDoc(doc(db, 'images', imageUuid), {
          created: serverTimestamp(),
          album: albumUuid,
          imageUrl: image.imageUrl,
        })

        setProgress(null)
        setIsSuccess(true)
        setIsUploading(false)
      } catch (err) {
        setError(err.message)
        setIsError(true)
        setIsUploading(false)
        setIsSuccess(false)
      }
    })
  }

  return {
    error,
    isError,
    isUploading,
    isSuccess,
    upload,
    progress,
  }
}

export default useCreateAlbum
