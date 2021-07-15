FROM python:3.6-slim-buster
ENV PYTHONUNBUFFERED 1
RUN mkdir /greenhose
WORKDIR /greenhose
COPY requirements.txt /greenhose/
RUN pip install -r requirements.txt
COPY . /greenhose/
EXPOSE 7000
# CMD [ "python", "./greenhouse/server.py" ]