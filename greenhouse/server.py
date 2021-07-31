from waitress import serve
from greenhouse.wsgi import application
import os
if __name__ == '__main__':
    serve(application, host="0.0.0.0", port='7000', threads=20)
