import requests
from decouple import config

ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Eleven labs
# text to speech

# defining data
def text_to_audio(message):
    body = {
        "text": message,
        "voice_settings":{
            "stability":0,
            "similarity_boost":0,
        }
    }
    
    # define voice
    voice = "GBv7mTt0atIp3Br8iCZE"
    
    # construting the endpoint adn headers
    headers = {"xi-api-key":ELEVEN_LABS_API_KEY,"Content-Type":"application/json","accept":"audio/mpeg"}
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}"
    
    # send requests
    try:
        response = requests.post(endpoint,json=body,headers=headers)
    except Exception as e:
        print(e)
        return
    
    # handling the response
    if response.status_code == 200:
        return response.content
    else:
        return
