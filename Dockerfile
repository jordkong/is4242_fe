FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app

COPY requirements.txt ./requirements.txt

RUN pip install -r requirements.txt


COPY ./app.py /app/main.py
COPY ./model.pkl /app/model.pkl


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
