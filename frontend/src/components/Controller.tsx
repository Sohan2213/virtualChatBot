import {useState} from 'react'
import Title from "./title"

export default function  () {
    const [isLoading,setIsLoading] = useState(false); 
    const[messages,setMessages] = useState<any[]>([]);

    const createBlogUrl = (data:any)=>{

    };
    // when the user stops the recording
    const handleStop = async () =>{

    };
  return (
    <div>
      <div className='h-screen overflow-y-hidden'>
        <Title setMessages={setMessages}/>
        <div className='flex flex-col justify-between h-full overflow-y-scroll pb-96'>
            {/* Recorder */}
            <div className='fixed bottom-0 w-full border-t text-center p-2 bg-gradient-to-r from-sky-500 to-violet-500 '>Hello</div>
              <div className='flex justify-center items-center'>

              </div>
        </div>
      </div>
    </div>
  )
}
