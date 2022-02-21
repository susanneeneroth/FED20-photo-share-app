import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useDeleteAlbum from '../hooks/useDeleteAlbum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import styled from 'styled-components'

const AlbumCard = ({ album }) => {
  const deleteAlbum = useDeleteAlbum(album)

  const handleDelete = () => {
    deleteAlbum.deleteAlbum()
  }

  return (
    <>
      {album && (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <Link to={`/${album._id}`} className="content-link">
            {album.name}
          </Link>
          <Button variant="dark" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </ListGroup.Item>
      )}
    </>
  )
}

// const TheLink = styled(Link)`
//   color: #df7422;
//   text-decoration: none;
//   &:hover {
//     color: #8f4a00;
//   }
// `

export default AlbumCard
