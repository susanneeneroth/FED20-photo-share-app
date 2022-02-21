import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import LogInForm from '../components/LogInForm'
import { Link } from 'react-router-dom'
// import LoginPage from './LoginPage'
// import { Container, Button } from 'react-bootstrap'
// import AlbumList from '../components/AlbumList'
// import { Link } from 'react-router-dom'

// const HomePage = () => {
//   return (
//     <>
//       <Container>
//         <h1>Photo Review</h1>
//         <h2>Your albums</h2>
//         <Link to="/upload">
//           <Button>Create new Album</Button>
//         </Link>
//         <AlbumList />
//       </Container>
//     </>
//   )
// }

// export default HomePage

const HomePage = () => {
  const { currentUser } = useAuthContext()

  return (
    <>
      <div className="content-wrapper">
        <h1 className="centered-heading">Welcome to PhotoShare</h1>
        {currentUser ? (
          <>
            <h2 className="content-header">
              You are logged in as {currentUser.email}
            </h2>
            <p className="content-text">
              To upload or edit your albums, go to the{' '}
              <Link to="/albums" className="content-link">
                Albums
              </Link>{' '}
              page.
            </p>
          </>
        ) : (
          <>
            <LogInForm />
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
