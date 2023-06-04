# FROM node:18.12.1

# COPY package.json /app/

# WORKDIR /thesearchable

# Run npm install
FROM python:3.10.5 as web

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN wget https://s3.amazonaws.com/shopify-managemant-app/wkhtmltopdf-0.9.9-static-amd64.tar.bz2
RUN tar xvjf wkhtmltopdf-0.9.9-static-amd64.tar.bz2
RUN mv wkhtmltopdf-amd64 /usr/local/bin/wkhtmltopdf
RUN chmod +x /usr/local/bin/wkhtmltopdf


WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .


FROM openjdk:8-jre-alpine as wkhtmltopdfimg

# Install wkhtmltopdf
RUN apk add --no-cache wkhtmltopdf

ENTRYPOINT ["wkhtmltopdf"]

# EXPOSE 8000



# CMD ["python", "manage.py", "runserver"]
