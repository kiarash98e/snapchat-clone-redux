/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import { MdRadioButtonUnchecked } from 'react-icons/md'
import { useAppDispatch } from '../../redux/app/hooks'
import { setCamraImage } from '../../redux/reducer/camraSlice'
import { useNavigate } from 'react-router-dom'

const webcamStyle = {
    height:407,
    width:274,
    facingMode:"user"
}

const WebcamCapture:React.FC = () => {
    const webcamRef = useRef<any>()
    const dispatch = useAppDispatch()
    const history = useNavigate()

    const capture = React.useCallback(() => {
        const img = webcamRef!.current!.getScreenshot()
        dispatch(setCamraImage(img))
        history("/preview")
    },[webcamRef])
    
    
    return (
        <div className='position-relative'>
            <Webcam 
                audio={false}
                ref={webcamRef}
                screenshotFormat={"image/jpeg"}
                height={webcamStyle.height}
                width={webcamStyle.width}
                videoConstraints={webcamStyle}
            />
            <MdRadioButtonUnchecked 
                className=' text-white'
                style={{    
                    transform: "translate(-50%,-50%)",
                    cursor: 'pointer',
                    position: 'absolute',
                    bottom: "0",
                    left:"50%",
                }}
                fontWeight="bold"
                fontSize={40}
                onClick={capture}
            />
        </div>
    )
}

export default WebcamCapture
