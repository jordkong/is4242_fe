from typing import List
from keras.models import load_model
from fastapi import FastAPI, Body, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from keras.preprocessing import image
from io import BytesIO
import numpy as np
import pickle 



app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = load_model("classifier.h5")

class_labels = None
with open("ResultsMap.pk1", 'rb') as file:
        class_labels = pickle.load(file)

def process_image(text: str) -> str:

    """
    Function to process the image if needed

    Parameters:
    text (str): TBD

    Returns:
    str: TBD
    """

    return None

@app.post("/get_label")
async def get_label(file: bytes = File(...)):
    """
    Endpoint to get labels for input images. Images would be processed first
    The processed image would be passed to the model to get predictions.

    Parameters:
    inputs (TextsModel): TBD

    Returns:
    dict: TBD
    """
    try:
        
        img = image.load_img(BytesIO(file), target_size=(128, 128))  # Ensure this matches your model's expected input dimensions
        
    
        img_array = image.img_to_array(img)
        
       
        img_array /= 255.0  
        

        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        
        
        predicted_class = np.argmax(predictions, axis=1)
        class_index = int(predicted_class[0])
        class_name = class_labels[class_index]
        return {"predictions": predictions.tolist(), "class": class_name}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
