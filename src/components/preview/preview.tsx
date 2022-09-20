import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/app/hooks'
import { resetCamra } from '../../redux/reducer/camraSlice'
import { useCamera } from '../../redux/selctor/camraSelector'
import { IoAttachOutline, IoCloseOutline, IoCropOutline, IoDocumentOutline, IoMusicalNoteOutline, IoPencilOutline, IoSendOutline, IoTimerOutline } from 'react-icons/io5'
import { MdTextFields } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import { db, storage } from '../../firebase/firebase.config'
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const Preview:React.FC = () => {

    const { selectImage } = useCamera()
    const image = selectImage.camraImage
    const user = selectImage.user
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (!image) {
            navigate("/", {replace: true})
        }
        
    }, [image, navigate])

    const close = () => {
        dispatch(resetCamra())
    }

    const sendPost = () => {
        const id = uuid()  
        const metadata = {
            contentType: 'image/jpeg'
        }
        const storageRef = ref(storage, `posts/${id}`)
        const uploadTask = uploadBytesResumable(storageRef, image, metadata)
        uploadTask.on('state_changed', null,
            (err:any) => {
                console.log("error")
                console.log(err)
            },
            () => {
                uploadString(storageRef, image, "data_url")
                .then((snapshot) => {
                    getDownloadURL(storageRef).then((url) => {
                        addDoc(collection(db,"posts"),{
                            imageUrl: url,
                            username: user!.username,
                            read:true,
                            profilePic: user!.profilePic,
                            timestemp: serverTimestamp()   
                        })
                        navigate('/chats', {replace: true})
                    })
                })
            })    
        }

    return (
        <div className='position-relative'>
            <IoCloseOutline size={25} onClick={close} className="position-absolute top-0 m-2 start-0"
                style={{
                    cursor: "pointer",
                    color:"#fff",
                }}
            />
            <div className="position-absolute top-0 m-2 end-0 d-flex flex-column ">
                <MdTextFields style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
                <IoPencilOutline style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
                <IoDocumentOutline style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
                <IoMusicalNoteOutline style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
                <IoAttachOutline style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
                <IoCropOutline style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
                <IoTimerOutline style={{
                    cursor: "pointer",
                    color:"#fff",
                    marginBottom: "8px",
                    fontSize:"20px"
                }}/>
            </div>
            <img src={image} alt="img preview" />
            <div 
                onClick={sendPost}
                className="bg-info text-white d-flex " 
                style={{
                    borderRadius:"15px",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    padding:"2px 10px",
                    cursor: 'pointer',
                    position: 'absolute',
                    right: "20px",
                    bottom: "-60px",
                    
                }}
            >
                <h3 style={{fontSize:"8px",marginRight:"4px",marginTop:"8px"}}>send now</h3>
                <IoSendOutline fontSize={13}/>
            </div>
        </div>
    )
}

export default Preview