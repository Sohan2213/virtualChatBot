import {useState} from 'react'
import Title from "./title"
import RecordMessage from './recordMessage';

export default function  () {
    const [isLoading,setIsLoading] = useState(false); 
    const[messages,setMessages] = useState<any[]>([]);
    // const [blob,setBlob] = useState("");
    const createBlobUrl = (data:any)=>{
      
    };
    // when the user stops the recording
    const handleStop = async (blobUrl:string) =>{
      console.log(blobUrl);
      // setBlob(blobUrl);
    };
  return (
    <div>
      <div className='h-screen overflow-y-hidden'>
        <Title setMessages={setMessages}/>
        <div className='flex flex-col justify-between h-full overflow-y-scroll pb-96'>
            {/* <audio src={blob} controls /> */}
            {/* Recorder */}
            <div className='fixed bottom-0 w-full border-t text-center p-2 bg-gradient-to-r from-sky-500 to-violet-500 '>
              <div className='flex justify-center items-center w-full'>
                <RecordMessage handleStop = {handleStop} />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
