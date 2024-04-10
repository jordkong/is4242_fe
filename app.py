from typing import List

from fastapi import FastAPI, Body, HTTPException
import sklearn
import pickle
import re



app = FastAPI()


# Load the model
model = pickle.load(open("", "rb"))


def process_image(text: str) -> str:

    """
    Function to process the image if needed

    Parameters:
    text (str): TBD

    Returns:
    str: TBD
    """

    return None

@app.post("/get_label/")
async def get_label(inputs):
    """
    Endpoint to get labels for input images. Images would be processed first
    The processed image would be passed to the model to get predictions.

    Parameters:
    inputs (TextsModel): TBD

    Returns:
    dict: TBD
    """
    try:

        
        processedImage = None
        predictions = model.predict(processedImage)
        
        return {"predictions": predictions.tolist()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
