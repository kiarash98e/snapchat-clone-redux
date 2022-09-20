import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { Button } from 'react-bootstrap'
import { auth, provider } from '../../firebase/firebase.config'
import { useAppDispatch } from '../../redux/app/hooks'
import { login } from '../../redux/reducer/camraSlice'
import Logo from '../img/logo.png'

const Login:React.FC = () => {

    const dispatch = useAppDispatch()
    
    const signIn = async() => {
        const res = await signInWithPopup(auth,provider)
        dispatch(login({
            username:res.user.displayName,
            id:res.user.uid,
            profilePic:res.user.photoURL

        }))
    }

    return (
        <div style={{
            backgroundColor:"#feff00",
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: "100vh",
            width:"100%",
            justifyContent: 'center',
            
        }}>
           <img  
                style={{
                    height: "100px",
                    objectFit:"contain",
                    width:"120px"
                }}   
                src={Logo}
                alt="" /> 
                <Button 
                 style={{
                    width:"220px",
                    padding:"12px",
                    borderRadius:"8px",
                    border: "1px solid #222",
                    color:"#222",
                    background:"transparent",
                 }}
                 onClick={signIn} >sign In</Button>
        </div>
    )
}

export default Login
