import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import AlbumCard from './AlbumCard'
import useGetCollection from '../hooks/useGetCollection'

const AlbumList = () => {
  const albums = useGetCollection('albums', {
    fetchOnlyCurrentUser: true,
  })

  return (
    <>
      <Card className="card">
        <ListGroup>
          {albums.data &&
            albums.data.map((album, index) => (
              <AlbumCard album={album} key={index} index={index} />
            ))}
        </ListGroup>
      </Card>
    </>
  )
}

export default AlbumList
