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

    await axios.get("http://localhost:8000/reset").then((res)=>{
      
    });
    setIsResetting(false);
  }
  return (
    <div>
      Hello World
    </div>
  )
}

export default title
