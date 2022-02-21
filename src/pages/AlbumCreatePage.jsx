import React from 'react'
import { Button } from 'react-bootstrap'
import AlbumList from '../components/AlbumList'
import { Link } from 'react-router-dom'

const AlbumCreatePage = () => {
  return (
    <>
      <div className="content-wrapper">
        <h1 className="centered-heading">Albums</h1>
        <AlbumList />
        <Link to="/upload">
          <Button className="btn-margin-top">Create new album</Button>
        </Link>
      </div>
    </>
  )
}

export default AlbumCreatePage
