import { useState } from 'react';
import Title from './Title';
import axios from 'axios';
import RecordMessage from './recordMessage';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  isLoading;
  const createBlobUrl = (data: any) => {
    const blob = new Blob([data], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  };

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    const userMsg = { sender: 'me', blobUrl };
    const msgArr = [...messages, userMsg];

    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', blob, 'myFile.wav');

      // const apiResponse = await axios.post('http://127.0.0.1:8000/post-audio/', formData, {
      //   headers: { 'Content-type': 'audio/mpeg' },
      //   responseType: 'arraybuffer',
      // });
      // for deploy
      const apiResponse = await axios.post('https://voicebot-n237.onrender.com/post-audio/', formData, {
        headers: { 'Content-type': 'audio/mpeg' },
        responseType: 'arraybuffer',
      });

      const botBlob = apiResponse.data;
      // console.log(botBlob);
      const botBlobUrl = createBlobUrl(botBlob);

      const botMsg = { sender: 'ai', blobUrl: botBlobUrl };
      msgArr.push(botMsg);
      setMessages(msgArr);

      const audio = new Audio(botBlobUrl);
      audio.play();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen overflow-y-hidden bg-gradient-to-r from-pink-300 to-pink-100'>
      <Title setMessages={setMessages} />
      <div className='flex flex-col justify-between h-full overflow-y-scroll pb-96'>
        <div className='mt-5 px-5'>
          <div className='text-center'></div>
          <div className='text-center'></div>
          <div className='text-center'> </div>
          {messages.map((audio, index) => (
            <div
              key={index + audio.sender}
              className={`flex ${audio.sender === 'ai' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`p-2 rounded-lg ${
                  audio.sender === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className='mb-1'>{audio.sender === 'ai' ? 'CAP' : 'Me'}</p>
                
                <audio src={audio.blobUrl} controls />
              </div>
            </div>
          ))}
        </div>
        <div className='fixed bottom-0 w-full border-t text-center p-2 bg-gradient-to-r from-blue-600 to-blue-900'>
          <div className='flex justify-center items-center w-full'>
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}
