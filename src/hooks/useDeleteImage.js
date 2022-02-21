import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'

const useDeleteImage = (image) => {
  const [isError, setIsError] = useState(null)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)

  const deleteImage = async () => {
    setError(null)
    setIsError(false)
    setIsDeleting(true)

    try {
      await deleteDoc(doc(db, 'images', image._id))
      setIsDeleting(false)
    } catch (e) {
      setError(e.message)
      setIsError(true)
      setIsDeleting(false)
    }
  }

  return {
    error,
    isError,
    isDeleting,
    deleteImage,
  }
}

export default useDeleteImage
