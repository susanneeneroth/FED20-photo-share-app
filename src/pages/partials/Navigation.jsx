import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuthContext } from '../../contexts/AuthContext'

const Navigation = () => {
  const { currentUser } = useAuthContext()

  return (
    <Navbar className="navbar" variant="dark" expand="md">
      <Container>
        <Link to="/" className="navbar-brand">
          PhotoShare
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Start
            </NavLink>
            {currentUser ? (
              <>
                <NavLink to="/albums" className="nav-link">
                  Albums
                </NavLink>
                <NavLink to="/logout" className="nav-link">
                  Log Out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="navbar-link link-margin-top">
                  Login
                </NavLink>
                <NavLink to="/signup" className="navbar-link link-margin-top">
                  Signup
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
