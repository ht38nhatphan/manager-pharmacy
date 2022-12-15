import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {

  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>

        <Routes>

          {/* {user?(<>
              <Route path="*" name="Dashboard" element={<DefaultLayout />} />
              <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            </>):(<>
              <Route exact path="/" name="Login Page" element={<Login />} />
              <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            </>)} */}
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page500 />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route exact path="*" name="Dashboard" element={<DefaultLayout />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Suspense>
    </BrowserRouter>
  )


}


export default App;
