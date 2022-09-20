/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Preview from '../components/preview/preview';
import WebcamCapture from '../components/webcamCapture/webcamCapture';
import Chats from '../components/chats/chats'
import ChatView from '../components/chatView/chatView'
import { useCamera } from '../redux/selctor/camraSelector';
import { useAppDispatch } from '../redux/app/hooks';
import Login from '../components/login/login'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { login, logout } from '../redux/reducer/camraSlice';
import '../App.css'
import Logo from '../components/img/logo.png'

function RouteLayout() {

  const { selectImage } = useCamera()
  const user = selectImage.user
  const dispatch = useAppDispatch()


  React.useEffect(() => {
    onAuthStateChanged(auth,(User => {
      if (User) {
        dispatch(login({
          username:User.displayName,
          profilePic:User.photoURL,
          id:User.uid
        }))
      }else {
        dispatch(logout())
      }
    }))
  }, [])

  return (
    <div className='app'>
        <Router>
            {
              !user ? <Login/> : (
                <>
                  <img className="app__logo" src={Logo} alt="snapchat-logo"/>
                  <div className='app__body'>
                    <div className='app__bodyBackground'>
                      <Routes>
                          <Route path='/' element={<WebcamCapture />} />
                          <Route path='preview' element={<Preview />} />
                          <Route path='chats' element={<Chats />} />
                          <Route path='chats/view' element={<ChatView />} />
                      </Routes>
                    </div>
                  </div>
                </>

              )
            }
        </Router>
    </div>
  )
}

export default RouteLayout;
