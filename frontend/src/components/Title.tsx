import { useState } from 'react';
import axios from 'axios';

type Props = {
  setMessages: any;
};

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  const resetConversation = async () => {
    setIsResetting(true);

    try {
      const response = await axios.get('http://127.0.0.1:8000/reset');
      if (response.status === 200) {
        setMessages([]);
      } else {
        console.error('There was an error in the API request.');
      }
    } catch (error) {
      console.error(error);
    }

    setIsResetting(false);
  };

  return (
    <div className='flex justify-center items-center p-4 w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold shadow-md'>
      <div className='w-3/3 mx-4 text-center'>
        <div className='italic text-2xl'>CAPability - Voice Assistant</div>
        <button
          onClick={resetConversation}
          className={`mt-2 text-white hover:text-red-600 focus:outline-none ${isResetting && 'animate-pulse'}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mx-auto'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Title;
