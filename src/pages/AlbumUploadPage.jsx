import React, { useEffect, useState, useRef } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import useUploadAlbum from '../hooks/useUploadAlbum'
import { useDropzone } from 'react-dropzone'
import { Link } from 'react-router-dom'
import ImageDropzone from '../components/ImageDropzone'
import { v4 as uuidv4 } from 'uuid'

const UploadAlbumPage = () => {
  const [images, setImages] = useState(null)
  const albumNameRef = useRef()
  const uploadAlbum = useUploadAlbum(images)
  const [alert, setAlert] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!acceptedFiles.length) {
      return
    }
    const albumUuid = uuidv4()

    uploadAlbum.createAlbum(albumNameRef.current.value, albumUuid)
    uploadAlbum.upload(acceptedFiles, albumUuid)
  }

  useEffect(() => {
    if (uploadAlbum.isSuccess) {
      setAlert(true)
    }
  }, [uploadAlbum.isSuccess])

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    handleSubmit,
  })

  useEffect(() => {
    if (acceptedFiles) {
      setImages(acceptedFiles)
    }
  }, [acceptedFiles])

  return (
    <>
      <div className="content-wrapper">
        <h1 className="centered-heading">Create new album</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name the album</Form.Label>
            <Form.Control required type="text" ref={albumNameRef} />
          </Form.Group>
          <Form.Group id="images">
            <Form.Label className="form-label-upload">Upload images</Form.Label>

            <ImageDropzone
              required
              params={{
                uploadAlbum,
                acceptedFiles,
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
              }}
            />
          </Form.Group>
          {alert && (
            <Alert className="alert-wrapper">
              Your album was created!
              <Link to="/albums" className="content-link">
                {' '}
                Go to albums
              </Link>
            </Alert>
          )}
          <Button type="dark" className="form-button-right">
            Create new album
          </Button>
        </Form>
      </div>
    </>
  )
}

export default UploadAlbumPage
