import openai
from decouple import config

# custom functions
from functions.db import get_recent_messages

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
    
    
# openai - chat-gpt
# getting resposnes from chatgpt
def get_chat_response(message_input):
    messages = get_recent_messages()
    user_messages = {"role":"user","content":message_input}
    messages.append(user_messages)
    print(messages)
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        # print(response)
        messages_text = response["choices"][0]["message"]["content"]
        return messages_text
    except Exception as e:
        print(e)
        return
