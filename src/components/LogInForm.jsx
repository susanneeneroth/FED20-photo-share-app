import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogInForm = () => {
  const { login } = useAuthContext()

  const emailRef = useRef()
  const passwordRef = useRef()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const signup = async () => {
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              {error && <>{error}</>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
            Not a member yet? <Button onClick={signup}>Sign Up</Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default LogInForm
