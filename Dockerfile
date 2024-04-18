FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app

COPY requirements.txt ./requirements.txt

RUN pip install -r requirements.txt


COPY ./app.py /app/main.py
COPY ./classifier.h5 /app/classifier.h5
COPY ./ResultsMap.pk1 /app/ResultsMap.pk1

CMD ["python", "/app/main.py"]
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
