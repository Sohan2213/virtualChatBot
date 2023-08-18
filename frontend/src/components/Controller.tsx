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
            Placeholder
        </div>
      </div>
    </div>
  )
}
