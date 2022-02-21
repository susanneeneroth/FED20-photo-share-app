import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, InputGroup, FormControl, Form, Alert } from 'react-bootstrap'
import useGetDocuments from '../hooks/useGetDocuments'
import useGetCollection from '../hooks/useGetCollection'
import useUploadAlbum from '../hooks/useUploadAlbum'
import { useAuthContext } from '../contexts/AuthContext'
import { db } from '../firebase'
import { collection, doc, getDocs } from 'firebase/firestore'
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore'
import ImageDropzone from '../components/ImageDropzone'
import { useDropzone } from 'react-dropzone'
import { SRLWrapper } from 'simple-react-lightbox'
import ImageList from '../components/ImageList'
import useCreateAlbum from '../hooks/useCreateAlbum'
import SelectedImages from '../components/SelectedImages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const AlbumPage = () => {
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)
  const [alert, setAlert] = useState(false)
  const albumNameRef = useRef()
  const urlRef = useRef()
  const [newImages, setNewImages] = useState()
  const [selectedImages, setSelectedImages] = useState([])
  const [dislikedImages, setDislikedImages] = useState([])
  const uploadAlbum = useUploadAlbum(newImages)
  const { data: album } = useGetDocuments('albums', 'album', id)
  const { data: images } = useGetCollection('images', {
    album: id,
  })
  const createNewAlbum = useCreateAlbum(selectedImages, album)

  /* Update name */
  const editName = useFirestoreDocumentMutation(
    doc(collection(db, 'albums'), id),
    {
      merge: true,
    },
  )

  const handleEditName = () => {
    setEdit(false)
    if (edit) {
      editName.mutate({
        name: albumNameRef.current.value,
      })
    }
  }

  const handleAdd = () => {
    setAdd(!add)
    if (!acceptedFiles.length) {
      return
    }
    uploadAlbum.upload(acceptedFiles, id)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlRef.current.value)
  }

  /* Create album */
  const handleNewAlbum = async (e) => {
    await createNewAlbum.upload()
    if (currentUser) {
      setAlert(true)
    }
  }

  /* Dropzone */
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    handleAdd,
  })

  useEffect(() => {
    if (acceptedFiles) {
      setNewImages(acceptedFiles)
    }
  }, [acceptedFiles])

  return (
    <>
      {album && (
        <div className="content-wrapper">
          <h1 className="centered-heading">Album</h1>
          {/* Edit name */}
          {edit ? (
            <InputGroup className="mb-3">
              <FormControl
                required
                type="text"
                defaultValue={album.name}
                ref={albumNameRef}
              />
              <Button size="sm" variant="dark" onClick={handleEditName}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <h2>{album.name}</h2>
          )}

          {currentUser && (
            <>
              <Button
                className="form-button-edit"
                onClick={() => setEdit(!edit)}
                variant="dark"
                size="sm"
              >
                {edit ? (
                  <>
                    <FontAwesomeIcon icon={faBackward} />
                  </>
                ) : (
                  <>
                    <span className="edit-btn-margin">Rate and edit album</span>
                    <FontAwesomeIcon icon={faEdit} />
                  </>
                )}
              </Button>
              <div>
                <InputGroup size="sm" className="mb-3">
                  <Button
                    variant="dark"
                    id="button-addon2"
                    onClick={handleCopyLink}
                  >
                    Copy link
                  </Button>
                  <FormControl
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    type="text"
                    value={window.location.href}
                    readOnly
                    ref={urlRef}
                  />
                </InputGroup>
              </div>
            </>
          )}
          {/* Dropzone */}
          {edit && (
            <>
              <ImageDropzone
                params={{
                  uploadAlbum,
                  acceptedFiles,
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragAccept,
                }}
              />
              <Button
                size="sm"
                className="form-button-edit"
                onClick={handleAdd}
              >
                Upload images
              </Button>
            </>
          )}

          {/* Images */}
          {edit ? (
            <>
              <p>Click to select the images you want to save to a new album.</p>
              <ImageList
                images={images}
                edit={edit}
                setSelectedImages={setSelectedImages}
                selectedImages={selectedImages}
              />

              {alert && (
                <Alert className="alert-wrapper">
                  A new album has been created.
                  <Link to="/albums" className="content-link">
                    {' '}
                    Go to albums
                  </Link>
                </Alert>
              )}
              <Button size="sm" onClick={handleNewAlbum}>
                Create new album with selected images
              </Button>
            </>
          ) : (
            <Form onSubmit={handleNewAlbum}>
              <>
                {/* Lightbox */}
                <SRLWrapper>
                  <ImageList
                    images={images}
                    edit={edit}
                    setSelectedImages={setSelectedImages}
                    selectedImages={selectedImages}
                    dislikedImages={dislikedImages}
                    setDislikedImages={setDislikedImages}
                  />
                </SRLWrapper>
                {!currentUser && (
                  <>
                    <SelectedImages
                      images={images}
                      selectedImages={selectedImages}
                      dislikedImages={dislikedImages}
                      handleNewAlbum={handleNewAlbum}
                      setSelectedImages={setSelectedImages}
                    />
                  </>
                )}
              </>
            </Form>
          )}
        </div>
      )}
    </>
  )
}

export default AlbumPage
