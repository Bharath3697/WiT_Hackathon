from waitress import serve
from greenhouse.wsgi import application
import os
if __name__ == '__main__':
    serve(application, port='7000', threads=20)
