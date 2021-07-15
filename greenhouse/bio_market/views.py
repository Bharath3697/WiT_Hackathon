# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.shortcuts import render
from django.utils import timezone
import datetime
from .models import item, topic, comment, donation,job
from account.models import Account,wallet
from rest_framework import viewsets
from .serializers import ItemSerializer, JobSerializer,AccountSerializer, TopicSerializer, CommentSerializer, DonationSerializer
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context, loader
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, renderer_classes, permission_classes, authentication_classes
from account.authentications import ExpiringTokenAuthentication
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
import requests
from .forms import DocumentForm
from django.contrib.auth import get_user_model
from django.conf import settings
User = get_user_model()

WEATHER_API_KEY=settings.WEATHER_API_KEY
ML_API_KEY=settings.ML_API_KEY

class itemviewset(viewsets.ModelViewSet):
    queryset = item.objects.all().order_by("-created_at")
    serializer_class = ItemSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class donationviewset(viewsets.ModelViewSet):
    queryset = donation.objects.all().order_by("-created_at")
    serializer_class = DonationSerializer

class jobviewset(viewsets.ModelViewSet):
    queryset = job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer

class useriewset(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class commentviewset(viewsets.ModelViewSet):
    queryset = comment.objects.all()
    serializer_class = CommentSerializer


class topicviewset(viewsets.ModelViewSet):
    queryset = topic.objects.all()
    serializer_class = TopicSerializer


@api_view(('GET',))
def pest_data(request):
    try:
        cropname = request.query_params.get('crop_name')
        if cropname == "paddy":
            url = "https://greenhouse-bucket.s3.us-south.cloud-object-storage.appdomain.cloud/paddy_"
            harmless = [
                ["Lady beetle", url+"ladybeetle.JPG", url +
                    "ladybeetle1.JPG", url+"ladybeetle2.JPG"],
                ["Earwig", url+'earwig1.JPG', url+'earwig2.JPG'],
                ["Damsfly", url+"damselflies.JPG", url +
                    "damselflies1.JPG", url+"damselflies2.JPG"],
                ["Grasshoper", url+"grasshoper.JPG", url +
                    "grasshoper1.JPG", url+"grasshoper2.JPG"],
                ["Ground beetle", url+"groundbeetle.JPG", url+"groundbeetle1.JPG"],
                ["Miridae", url+"miridae.JPG", url+"miridae1.JPG"],
                ["Waterbug", url+"waterbug.JPG", url+"waterbug1.JPG"]
            ]
            harmful = [["Rice Hispa", url+"Rice-hispa.png",
                        url+"Rice-hispa_2.png",
                        url+"Rice-hispa_3.png"],

                       ["Yellow Stem Borer", url+"yellow_stem_borer.png",
                                                 url+"yellow_stem_borer_2.png",
                                                 url+"yellow_stem_borer_3.png"],

                       ["Army Worm", url+"army_worm.jpg",
                        url+"army_worm_2.jpg",
                        url+"army_worm_3.jpg"],

                       ["Planthopper", url+"planthopper.jpg",
                        url+"planthopper_2.jpg",
                        url+"planthopper_3.jpg"]]
        else:
            url = "https://greenhouse-bucket.s3.us-south.cloud-object-storage.appdomain.cloud/wheat_"
            harmless = [
                ["Convergent Lady Beetle", url+"Convergent Lady Beetle.jpg", url +
                 "Convergent Lady Beetle1.jpg", url+"Convergent Lady Beetle2.jpg"],
                ["Seven-spotted Lady Beetle", url+"Seven-spotted Lady Beetle.jpg", url+"Seven-spotted Lady Beetle1.jpg", url +
                 "Seven-spotted Lady Beetle2.jpg"],
                ["Soft-winged Flower Beetles", url+"Soft-winged Flower Beetles.jpg", url +
                 "Soft-winged Flower Beetles1.jpg", url+"Soft-winged Flower Beetles2.jpg"]
            ]

            harmful = [["Army Worm", url+"army_worm.jpg",
                        url+"army_worm_2.jpg",
                        url+"army_worm_3.jpg"],

                       ["Hessian Fly", url+"hessian_fly.JPG",
                        url+"hessian_fly1.JPG",
                        url+"hessian_fly2.JPG"],

                       ["Stink Bug", url+"stinckbug.JPG",
                        url+"stinckbug1.JPG",
                        ],
                       ]

        return Response({"harmless": harmless, "harmful": harmful}, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
def weather(request):
    postal_code = request.query_params.get('postal_code')
    if postal_code == None:
        return Response({"message": "Postal code is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        response = requests.get("https://api.weather.com/v3/wx/forecast/daily/7day?postalKey={}:IN&units=e&language=en-US&format=json&apiKey={}".format(postal_code,WEATHER_API_KEY))
        conv = {'Monday': "Mon", 'Tuesday': 'Tue', 'Wednesday': 'Wed',
        'Thursday': 'Thu', 'Friday': 'Fri', 'Saturday': 'Sat', 'Sunday': 'Sun'}
        data = response.json()
        day = [conv[i] for i in data['dayOfWeek']]
        max_temp = [round((i-32)*(5/9))
                    for i in data['calendarDayTemperatureMax']]
        min_temp = [round((i-32)*(5/9))
                    for i in data['calendarDayTemperatureMin']]
        day_precipChance = [data['daypart'][0]['precipChance'][i] for i in range(0,15,2)]
        night_precipChance = [data['daypart'][0]['precipChance'][i] for i in range(1,16,2)]

        day_precipType = [data['daypart'][0]['precipType'][i] for i in range(0,15,2)]
        night_precipType = [data['daypart'][0]['precipType'][i] for i in range(1,16,2)]

        day_wind_dir_disc = [data['daypart'][0]['windPhrase'][i] for i in range(0,15,2)]
        night_wind_dir_disc = [data['daypart'][0]['windPhrase'][i] for i in range(1,16,2)]

        day_windSpeed = [data['daypart'][0]['windSpeed'][i] for i in range(0,15,2)]
        night_windSpeed = [data['daypart'][0]['windSpeed'][i] for i in range(1,16,2)]

        day_narrative = [data['daypart'][0]['narrative'][i]  for i in range(0,15,2)]
        night_narrative = [data['daypart'][0]['narrative'][i]  for i in range(1,16,2)]


        return Response({"day":day,
        "max_temp":max_temp,"min_temp":min_temp,"day_precipChance":day_precipChance,"night_precipChance":night_precipChance,
        "day_precipType":day_precipType,"night_precipType":night_precipType,"day_windSpeed":day_windSpeed,"night_windSpeed":night_windSpeed
        ,"day_wind_dir_disc":day_wind_dir_disc,"night_wind_dir_disc":night_wind_dir_disc,"day_narrative":day_narrative,"night_narrative":night_narrative
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class cab_share(APIView):
    def post(self, request):
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            if form.cleaned_data['imagefile']:
                coins=0
                file = form.cleaned_data['imagefile'].file
                resp = requests.post("http://max-ocr.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud/model/predict",
                files={"image":file})
                if resp.status_code == 200:
                    data=resp.json()['text']
                    for i in data:
                        for j in i:
                            if "olashare" in j.strip(" ").replace(" ","").lower():
                                coins=10
                    if coins==0: 
                         return Response({"response": "Verification failed for uploaded image"}, status=status.HTTP_400_BAD_REQUEST)
                    wallet_obj=wallet.objects.get(wallet_user=request.user)
                    wallet_obj.coins=wallet_obj.coins+coins
                    wallet_obj.save() 
                else:
                    return Response({"response": "Could not process the uploaded image"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"message": "Success","coins":wallet_obj.coins}, status=status.HTTP_200_OK)
            else:
                return Response({"response": "No file found"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": form.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
def coins(request):
    user=request.user
    try:
        obj=wallet.objects.get(wallet_user=user)    
        return Response({"coins": obj.coins}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
def agri_rec(request):
    try:
        N = request.query_params.get('N')
        P = request.query_params.get('P')
        K = request.query_params.get('K')
        PH = request.query_params.get('PH')
        TMP = request.query_params.get('TMP')
        HUM = request.query_params.get('HUM')
        RF = request.query_params.get('RF')
        token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={
                                    "apikey": ML_API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
        mltoken = token_response.json()["access_token"]

        header = {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + mltoken}

        payload_scoring = {"input_data": [{"fields": ["N", 'P', 'K', 'temparature',
                                                    'humidity', 'ph', 'rainfall'], "values":  [[N, P, K, TMP,HUM, PH, RF]]}]}

        response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/79f1c1da-d607-4d82-8256-0a3c8bda94c5/predictions?version=2021-06-16',
                                        json=payload_scoring, headers={'Authorization': 'Bearer ' + mltoken})
        return Response({"crop": response_scoring.json()['predictions'][0]['values'][0][0]}, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(('POST',))
def Ebill(request):
    cnum=request.data.get('cnum')
    cname=request.data.get('cname')
    state=request.data.get('state')
    amount=request.data.get('amount')
    if cnum==None or cname==None or state==None or amount==None:
        return Response({"response": "All fields are mandatory"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        wallet_obj=wallet.objects.get(wallet_user=request.user)
        wallet_obj.coins=wallet_obj.coins+10
        wallet_obj.save()  
        return Response({"message": "success"}, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    