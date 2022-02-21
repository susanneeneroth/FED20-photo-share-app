import React, { useState } from 'react'
import { Modal, Button, Col, Row, Card } from 'react-bootstrap'

const SelectedImages = ({
  images,
  selectedImages,
  dislikedImages,
  handleNewAlbum,
}) => {
  const [show, setShow] = useState(false)
  const [thanks, setThanks] = useState(false)

  return (
    <>
      <Button
        disabled={
          !(selectedImages?.length + dislikedImages?.length === images?.length)
        }
        type="submit"
        variant="dark"
        onClick={(e) => {
          e.preventDefault()
          setShow(true)
        }}
      >
        Save selection
      </Button>
      {show && (
        <Modal
          closebutton={thanks ? '' : undefined}
          show={() => setShow(true)}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton={thanks}>
            <Modal.Title>Rating of images</Modal.Title>
          </Modal.Header>
          {/* <p className="liked-text">Liked images</p> */}
          {thanks ? (
            <p className="text-center m-4">Thankyou for your rating!</p>
          ) : (
            <>
              <Modal.Body>
                {dislikedImages && (
                  <Row className="mt-3">
                    {selectedImages.map((image, i) => {
                      return (
                        <Col key={i} xs={6} sm={4} md={3} className="mb-3">
                          <Card>
                            <Card.Img src={image.imageUrl} />
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                )}
                <hr />
                <p>Disliked images</p>
                <Row className="mt-3">
                  {dislikedImages?.map((image, i) => {
                    return (
                      <Col key={i} xs={6} sm={4} md={3} className="mb-3">
                        <Card>
                          <Card.Img src={image.imageUrl} />
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="dark" onClick={() => setShow(false)}>
                  Go back
                </Button>
                <Button
                  variant="dark"
                  onClick={() => {
                    handleNewAlbum()
                    setThanks(true)
                  }}
                >
                  Save
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default SelectedImages
