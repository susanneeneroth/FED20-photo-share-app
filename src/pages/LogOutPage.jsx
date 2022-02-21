import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogOutPage = () => {
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  useEffect(async () => {
    await logout()
    navigate('/')
  })

  return (
    <div>
      <h1 className="centered-heading">Log out</h1>
    </div>
  )
}

export default LogOutPage
