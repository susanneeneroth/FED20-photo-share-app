import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import PageNotFound from './pages/PageNotFound'
import RequireAuth from './components/RequireAuth'
import LogOutPage from './pages/LogOutPage'
import AlbumCreatePage from './pages/AlbumCreatePage'
import AlbumUploadPage from './pages/AlbumUploadPage'
import AlbumPage from './pages/AlbumPage'

function App() {
  return (
    <>
      <Navigation />

      <div className="hero"></div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/:id" element={<AlbumPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth redirectTo={'/login'}>
              <LoginPage />
            </RequireAuth>
          }
        />

        <Route
          path="/upload"
          element={
            <RequireAuth redirectTo={'/login'}>
              <AlbumUploadPage />
            </RequireAuth>
          }
        />

        <Route
          path="/albums"
          element={
            <RequireAuth redirectTo={'/login'}>
              <AlbumCreatePage />
            </RequireAuth>
          }
        />

        <Route
          path="/logout"
          element={
            <RequireAuth redirectTo={'/'}>
              <LogOutPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <div className="footer-wrapper">
        <div className="footer-content">Footer</div>
      </div> */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  )
}

export default App
