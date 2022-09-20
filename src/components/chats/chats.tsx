/* eslint-disable array-callback-return */
import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { IoSearchOutline, IoChatboxOutline, IoRadioButtonOffOutline } from 'react-icons/io5'
import { auth, db } from '../../firebase/firebase.config'
import './chats.css'
import Chat from '../chat/chat'
import { useCamera } from '../../redux/selctor/camraSelector'
import { useAppDispatch } from '../../redux/app/hooks'
import { useNavigate } from 'react-router-dom'
import { logout, resetCamra } from '../../redux/reducer/camraSlice'
import moment from 'moment'

const Chats:React.FC = () => {
    
    const [posts,setPosts] = React.useState<any>([])

    
    useEffect(() => {
        const dataRef = collection(db,"posts")
        const qer = query(dataRef)
        onSnapshot(qer, (snapshot) => {
            snapshot.docs.map((doc) => {
                return setPosts([{ data: doc.data(), id: doc.id }])
            })
        })
    }, [])
 

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const takeSnap = () => {
        dispatch(resetCamra())
        navigate("/")
    }

    const { selectImage } = useCamera() 

    const user = selectImage.user
    return (
        <div className='chats'>
            <div className="chats__header">
                <Image src={user.profilePic} onClick={() => {
                    auth.signOut()
                    dispatch(logout())
                }} className='chats__avatar' />
                <div className="chats__search">
                    <IoSearchOutline className='text-white' fontSize={12}/>
                    <input placeholder='Friends' type="text" />
                </div>
                <IoChatboxOutline className='chats__chatIcon text-white'/>
            </div> 
            <div className="chats__posts">
                {
                    posts.map((item:any) => {
                        const time = moment(item.data.timestamp).toDate()
                        return <Chat 
                            key={item.id}
                            id={item.id}
                            username={item.data.username}
                            timestamp={time}
                            imageUrl={item.data.imageUrl}
                            read={item.data.read}
                            profilePic={item.data.profilePic}
                        />
                    })
                }
            </div>
            <IoRadioButtonOffOutline fontSize={"40px"} style={{
                position: 'absolute',
                backgroundColor:"#fff",
                borderRadius:"100%",
                cursor: 'pointer',
                bottom: 0,
                left:"50%",
                transform: "translate(-50%,-50%)",
            }}
            onClick={takeSnap}
            />
        </div>
    )
}

export default Chats
