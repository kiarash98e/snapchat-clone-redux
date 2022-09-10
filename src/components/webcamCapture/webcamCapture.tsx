import React, { useRef } from 'react'
import Webcam from 'react-webcam'


const webcamStyle = {
    height:250,
    width:400,
    facingMode:"user"
}

const WebcamCapture:React.FC = () => {
    const webcamRef = useRef(null)
    return (
        <div className='webcamCapture'>
            <Webcam 
                audio={false}
                ref={webcamRef}
                screenshotFormat={"image/jpeg"}
                height={webcamStyle.height}
                width={webcamStyle.width}
                videoConstraints={webcamStyle}
            />
        </div>
    )
}

export default WebcamCapture
