import React from 'react'
import { useSelector } from 'react-redux';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Login from '../views/pages/login/Login'
const DefaultLayout = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  return (
    <div>
      {user ? (
        <>
          <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <AppContent />
              </div>
              <AppFooter />
            </div>
          </div>

        </>
      )
        : (
          <>
            <Login />
          </>

        )
      }

    </div>

  )
}

export default DefaultLayout
