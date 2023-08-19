# uvicorn main:app
# uvicorn main:app --reload

#main imports
from fastapi import FastAPI, File, UploadFile,HTTPException
from fastapi.responses import StreamingResponse #to send the audio file back
from fastapi.middleware.cors import CORSMiddleware 
from decouple import config # for env files in config
import openai

# custom functions inputs
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.db import store_messages, reset
from functions.text_to_speech import text_to_audio

# initiating the app
app = FastAPI()

# CORS - origins
origins = ['*']

# "http://localhost:5173/",
#     "http://localhost:3000/",
#     "http://localhost:5173",
#     "http://127.0.0.1:5173/",
# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=['*'],
)

@app.get("/health")
async def check_health():
    return {"message": "Healthy"}

# resetting the messages
@app.get("/reset")
async def reset_convo():
    reset()
    return {"message": "Conversation resetted!"}


# get audio
@app.post('/post-audio/')
async def post_audio(file: UploadFile = File(...)):
    # get saved audio
    # audio_input = open("testMsg.mp3","rb") # rb - for read bytes
    
    # save the file from frontend
    with open(file.filename,"wb") as buffer:
        buffer.write(file.file.read())
    audio_input = open(file.filename,"rb")
    
    # deocode audio
    msg_decoded = convert_audio_to_text(audio_input)
    
    print(msg_decoded)
    
    # Ensuring message is decoded
    if not msg_decoded:
        return HTTPException(status_code=400,detail="Failed to get the decoded audio")
    
    # Extract text from the dictionary and convert to a string
    decoded_text = msg_decoded.get("text", "")
    
    # get the chat gpt response
    chat_response = get_chat_response(decoded_text)
    # print(chat_response)
    
    # check
    if not chat_response:
        return HTTPException(status_code=400,detail="Failed to get the chat_response")
      
    # store the messages in db
    store_messages(decoded_text,chat_response)
    
    # convert resposne to audio
    audio_out = text_to_audio(chat_response)
    
    # check
    if not audio_out:
        return HTTPException(status_code=400,detail="Failed to get the audio")
    
    # generator that yields chunks of data
    def iterfile():
        yield audio_out
        
    # return audio file
    # audio_length = len(audio_out)
    return StreamingResponse(iterfile(), media_type="application/octet-stream")

    
    
# posting bot response
# Note : Not playing in browser when using post request
# @app.post('/postAudio/')
# async def post_audio(file: UploadFile = File(...)):
#     print("Hello")