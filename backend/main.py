# uvicorn main:app
# uvicorn main:app --reload

#main imports
from fastapi import FastAPI, File, UploadFile,HTTPException
from fastapi.responses import StreamingResponse #to send the audio file back
from fastapi.middleware.cors import CORSMiddleware 
from decouple import config # for env files in config
import openai

# custom functions inputs
from functions.openai_requests import convert_audio_to_text

# initiating the app
app = FastAPI()

# CORS - origins
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

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


# get audio
@app.post('/post-audio-get/')
async def get_audio():
    # get saved audio
    audio_input = open("testMsg.mp3","rb") # rb - for read bytes
    
    # deocode audio
    msg_decoded = convert_audio_to_text(audio_input)
    
    print(msg_decoded)
    print("hello")
    return "done"
    
    
# posting bot response
# Note : Not playing in browser when using post request
# @app.post('/postAudio/')
# async def post_audio(file: UploadFile = File(...)):
#     print("Hello")