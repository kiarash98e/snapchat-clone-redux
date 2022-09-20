/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCamera } from '../../redux/selctor/camraSelector'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const ChatView:React.FC = () => {
    
    const navigate = useNavigate()
    const { selectImage } = useCamera()
    const  imageSelect = selectImage.selectedImage

    const exit = () => {
        navigate("/chats")
    }

    useEffect(() => {
        if (!imageSelect) {
            exit()
        }
        
    }, [imageSelect])


    return (
        <div className='position-relative'>
            <img onClick={exit} className='cursor-pointer ' src={imageSelect} alt="img select" />
            <div className="position-absolute top-0 right-0 m-3">
                <CountdownCircleTimer 
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        "#004777",
                        "#f78801",
                        "#a30000",
                    ]}
                    colorsTime={[10,5,0]}
                    //</div>className="position-absolute top-0 right-0 m-3">
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit()
                        }
                        return remainingTime
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
