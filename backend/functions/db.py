import json
import random

# getting recent messages
def get_recent_messages(): 
    
    # the file name and the learn instruction
    file_name = "data.json"
    learn_instructions = {
        "role": "system",
        "content": "You are interviewing the user for a job as sde intern. Ask short questions that are relevant to a fresher. Your name is Julie. Keep your answers under 15 words.",
        
    }
    
    # Initialize messages
    messages = []
    
    # Add a random elements
    x = random.uniform(0,1)
    if x<0.5:
        learn_instructions["content"]=learn_instructions["content"] + "Your response should include light humour."
    
    else:
        learn_instructions["content"] = learn_instructions["content"] + "Your response will include a challenging question."
    
    # Appending instructions to messages
    messages.append(learn_instructions)
    
    # get last messages
    try:
        with open(file_name) as user_file:
            data = json.load(user_file)
            
            # append the last 5 conversations
            if data:
                if len(data)<5:
                    for item in data:
                        messages.append(item)
                else:
                    # last 5 recent conversations
                    for item in data[-5:]:
                        messages.append(item)    
        
    except Exception as e:
        print(e)
        pass

    # returing mesasges
    return messages

# storing the responses
def store_messages(request_msg,response_msg):
    
    file_name = "data.json"
    
    # gettinf the recent messages excluding the first message
    messages = get_recent_messages()[1:]
    
    # add messages to data
    user_message = {"role":"user","content":request_msg}
    ai_message = {"role":"assistant","content":response_msg}
    messages.append(user_message)
    messages.append(ai_message)
    
    # saving the updated file
    with open(file_name,'w') as file: # w - write
        json.dump(messages,file)
        
# resetting the messages after conversation
def reset():
    
    # overwriting the file
    open("data.json","w")