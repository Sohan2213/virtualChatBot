// import React from 'react'
import { ReactMediaRecorder } from "react-media-recorder";
import RecorderIcon from "./recorderIcon";

type Props = {
    handleStop: any;
}

function recordMessage({ handleStop }: Props) {
  return <ReactMediaRecorder 
    audio
    onStop={handleStop}
    render={({ status, startRecording, stopRecording})=>(<div className="mt-2">
        <button className="bg-white p-4 rounded-full" onMouseDown={startRecording} onMouseUp={stopRecording}>Icon</button>
        <p className="mt-2 text-white font-light">{status}</p>
        </div>)}
  />
}

export default recordMessage
