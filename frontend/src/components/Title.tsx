import {useState} from 'react';
import axios from "axios";

type Props = {
    setMessages: any;
};

function title({setMessages}:Props) {
  const [isResetting,setIsResetting] = useState(false);

  // reset the converstaion
  const resetConversation = async ()=>{
    setIsResetting(true);

    await axios
      .get("http://127.0.0.1:8000/reset")
      .then((res)=>{
        if(res.status==200){
          // console.log(res.data);
          // revert back to original one
          setMessages([]);
        }
        else{
          console.error("There was an error in the api request call");
        }
      })
      .catch((err)=>{
        console.error(err.message);
      });

    setIsResetting(false);
  };

  return (
    <div className='flex justify-between items-center p-4 w-full bg-gray-900 text-white font-bold shadow'>
      <div className='italic'>CAP</div>
      <button onClick={resetConversation} className={"transition-all duration-300 text-blue-300 hover:text-red-600 " + (isResetting && "animate-pulse") }>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
          />
        </svg>
      </button>
    </div>
      // <button onClick={resetConversation} className='bg-gray-500 p-4'>Reset</button>
  )
}

export default title
