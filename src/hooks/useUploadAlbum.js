import { useState } from 'react'
import { db, storage } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const useUploadAlbum = () => {
  const { currentUser } = useAuthContext()
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isUploading, setIsUploading] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [progress, setProgress] = useState(null)

  const createAlbum = (albumName, albumId) => {
    setDoc(doc(db, 'albums', albumId), {
      created: serverTimestamp(),
      user: currentUser.uid,
      name: albumName,
    })
  }

  const upload = async (images, albumId) => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsUploading(true)

    images.map(async (image) => {
      if (!image instanceof File) {
        setError('Upload your file')
        setIsError(true)
        setIsUploading(false)
        return
      }

      const photoId = uuidv4()

      try {
        const storageRef = ref(
          storage,
          `${currentUser.uid}/${albumId}/${photoId}`,
        )

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on('state_changed', (uploadTaskSnapshot) => {
          setProgress(
            Math.round(
              (uploadTaskSnapshot.bytesTransferred /
                uploadTaskSnapshot.totalBytes) *
                100,
            ),
          )
        })

        await uploadTask.then()

        const imageUrl = await getDownloadURL(storageRef)

        await setDoc(doc(db, 'images', photoId), {
          created: serverTimestamp(),
          album: albumId,
          imageUrl,
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
    createAlbum,
    progress,
  }
}

export default useUploadAlbum
