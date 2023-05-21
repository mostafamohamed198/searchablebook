# FROM node:18.12.1

# COPY package.json /app/

# WORKDIR /thesearchable

# Run npm install

FROM python:3.10.5

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# EXPOSE 8000



# CMD ["python", "manage.py", "runserver"]
