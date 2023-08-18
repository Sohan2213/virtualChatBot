import openai
from decouple import config

# retrieving env variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")


# using whisper part of openAI
# convert audio to text
def convert_audio_to_text(audio_file):
    try:
        textFromAud = openai.Audio.transcribe("whisper-1",audio_file)
        msg_text = textFromAud
        return msg_text
    except Exception as e:
        print(e)
        return