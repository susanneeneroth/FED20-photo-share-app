import React from 'react'
import ImageCard from './ImageCard'
import { Row, Col } from 'react-bootstrap'

const AlbumList = ({
  images,
  edit,
  setSelectedImages,
  selectedImages,
  dislikedImages,
  setDislikedImages,
}) => {
  return (
    <>
      <Row>
        {images?.map((image, i) => {
          return (
            <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <ImageCard
                image={image}
                edit={edit}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                dislikedImages={dislikedImages}
                setDislikedImages={setDislikedImages}
              />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default AlbumList
