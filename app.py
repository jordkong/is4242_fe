from typing import List

from fastapi import FastAPI, Body, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import sklearn
import pickle
import re



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
model = pickle.load(open("classifier.pkl", "rb"))


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
        
        processedImage = file
        predictions = model.predict(processedImage)
        
        return {"predictions": predictions.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
