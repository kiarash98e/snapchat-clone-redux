import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { IoVideocam } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { db } from '../../firebase/firebase.config'
import { useAppDispatch } from '../../redux/app/hooks'
import { selectedImg } from '../../redux/reducer/camraSlice'


const Chat = ({
    id,
    read,
    timestamp,
    imageUrl,
    username,
    profilePic
}) => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const open = () => {
        if (!read) {
            dispatch(selectedImg(imageUrl))
            setDoc(doc(db, "posts", id), 
                { read: true
                        
                }, 
                { merge: true})
            navigate("/chats/view")
        }
    }

    return (
        <div onClick={open} className="d-flex align-items-center justify-content-center pt-2 border-bottom border-white cursor-pointer">
            <img 
                src={profilePic} 
                alt="img profile"
                style={{
                    paddingLeft:"10px",
                    borderRadius:"100%",
                    width: "40px",
                    height: "40px",
                }}
            />
            <div className='flex-grow-1' style={{
                paddingLeft:"10px",
                paddingTop: "15px",
                
            }}>
                <h4 
                    style={{
                        fontSize:"14px",
                        fontWeight:"500",
                        
                    }}
                >{username}</h4>
                <p style={{fontSize:"11px"}}>
                    {!read && "Tap to view - "}{""}
                    {<ReactTimeAgo locale="en-US"  timeStyle={"round-minute"} date={timestamp}/>}
                </p>
                
            </div>
            {!read && <IoVideocam className='text-danger'/>}
        </div>
    )
}

export default Chat
