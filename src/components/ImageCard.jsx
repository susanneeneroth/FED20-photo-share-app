import React, { useState, useEffect } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import useDeleteImage from '../hooks/useDeleteImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbsDown,
  faThumbsUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

const ImageCard = ({
  image,
  edit,
  selectedImages,
  setSelectedImages,
  dislikedImages,
  setDislikedImages,
}) => {
  const { currentUser } = useAuthContext()
  const [isSelected, setIsSelected] = useState()
  const deleteImage = useDeleteImage(image)

  const handleDelete = () => {
    deleteImage.deleteImage()
  }

  const handleClick = (e) => {
    if (edit && e.target.type !== 'button') {
      setIsSelected(!isSelected)
    }
  }

  useEffect(() => {
    if (isSelected === false) {
      setSelectedImages(selectedImages?.filter((i) => i._id !== image._id))
      if (!edit) {
        setDislikedImages([...dislikedImages, image])
      }
    }

    if (isSelected) {
      setSelectedImages([...selectedImages, image])
      if (!edit) {
        setDislikedImages(dislikedImages?.filter((i) => i._id !== image._id))
      }
    }
  }, [isSelected])

  return (
    <Card
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        border: `${isSelected && currentUser ? '3px solid' : '0.5px solid'}`,
      }}
      border={isSelected && currentUser && 'warning'}
    >
      {/* delete button */}
      {currentUser && edit && (
        <Card.Header>
          <Button size="sm" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </Card.Header>
      )}

      {/* image */}
      {edit ? (
        <Card.Img src={image.imageUrl} />
      ) : (
        <a href={image.imageUrl}>
          <Card.Img src={image.imageUrl} />
        </a>
      )}

      {/* Like buttons */}
      {!currentUser && (
        <>
          <Card.Footer className="justify-content-between d-flex">
            <Form.Check
              id={`${image._id}-like`}
              inline
              label={<FontAwesomeIcon icon={faThumbsUp} />}
              name={image._id}
              type="radio"
              required
              onClick={() => setIsSelected(true)}
            />
            <Form.Check
              id={`${image._id}-dislike`}
              label={<FontAwesomeIcon icon={faThumbsDown} />}
              name={image._id}
              type="radio"
              required
              onClick={() => setIsSelected(false)}
            />
          </Card.Footer>
        </>
      )}
    </Card>
  )
}

export default ImageCard
