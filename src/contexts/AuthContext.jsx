import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // User Signup
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // User Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // User Logout
  const logout = () => {
    return signOut(auth)
  }

  // Auth-state observer
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const contextValues = {
    currentUser,
    signup,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? '' : <>{children}</>}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthContextProvider as default }
