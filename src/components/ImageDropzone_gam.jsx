import React, { useCallback } from 'react'
import { Alert } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import useUploadImage from '../hooks/useUploadAlbum'

const UploadAlbumDropzone = () => {
  const uploadImage = useUploadImage()

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return
    }

    // trigger upload
    uploadImage.mutate(acceptedFiles[0])
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/jpeg, image/gif, image/png, image/webp',
    maxFiles: 1,
    onDrop,
  })

  return (
    <div className="content-wrapper">
      <h2 className="centered-heading">Upload images</h2>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        id="dropzone-wrapper"
        className={`${isDragAccept ? 'accept-file' : ''}${
          isDragReject ? 'reject-file' : ''
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          isDragAccept ? (
            <p>Drop your file.</p>
          ) : (
            <p>Sorry but that file format is not accepted.</p>
          )
        ) : (
          <p>Upload your image by dropping it here.</p>
        )}
        {uploadImage.progress !== null && (
          <ProgressBar variant="success" now={uploadImage.progress} />
        )}

        {/* Upload progress with progress bar */}

        {uploadImage.isError && (
          <Alert variant="warning">{uploadImage.error}</Alert>
        )}
        {uploadImage.isSuccess && (
          <Alert variant="success">File successfully uploaded!</Alert>
        )}
      </div>
    </div>
  )
}

export default UploadAlbumDropzone
