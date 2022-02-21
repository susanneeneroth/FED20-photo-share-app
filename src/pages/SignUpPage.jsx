import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SignupPage = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // make sure user has entered the same password in both input fields
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('The passwords does not match')
    }

    setError(null)

    // try to sign up the user with the specified credentials
    try {
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="content-wrapper">
        <h1 className="centered-heading">Sign up</h1>
        <div className="form-wrapper">
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm" className="mb-3">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button disabled={loading} type="submit" className="btn">
              Create Account
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignupPage
