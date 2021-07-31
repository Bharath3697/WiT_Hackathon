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
ML_URL=settings.ML_URL

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
            harmless = [
                ["Lady beetle", "https://entomology.ca.uky.edu/files/styles/panopoly_image_original/public/img0615.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coccinella_magnifica01.jpg","https://s3.eu-west-2.amazonaws.com/growinginteractive/bbh/beneficial-insects/ladybird.jpg"],
                ["Earwig", 'https://blog.nature.org/science/files/2020/07/48731799392_f1a827c311_k-1260x708.jpg', 'https://plunketts.net/uploads/permanent/0b7c7510ee0d71defa18c8bc4ae4ee05.jpg'],
                ["Damsfly", 'https://www.thoughtco.com/thmb/fm9HBlRZLb4enK98RZnN43P4Eko=/2543x1907/smart/filters:no_upscale()/close-up-of-damselfly-on-leaf-924596546-5ada7738c67335003731d221.jpg', 'https://vineyardgazette.com/sites/default/files/styles/article_img_feature/public/article-assets/main-photos/2016/violet_dancer_damselfly.jpg?itok=16s6H3nr', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIcojOJrdK-Ut1iwXj4Tn7v5y6gJ-uscmPfw&usqp=CAU"],
                ["Grasshoper", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5uxGwuXSMgoQkuiyVWNPPSiiXMq1Qe2dfTdQBQHDtEBpEX8WTSYtM-EvKmBY_CT1GwQQ&usqp=CAU", "https://www.thoughtco.com/thmb/ftdnBh_kxxrAULS3OtUxHiwHIF8=/1411x1411/smart/filters:no_upscale()/GettyImages-155095890-58324eff3df78c6f6a97fa76.jpg", "https://www.gannett-cdn.com/-mm-/189c2bcca58439495d03a05c7e96d1e1f4368c5a/c=0-25-507-311/local/-/media/USATODAY/USATODAY/2014/06/03//1401817168000-461784393-1-.jpg"],
                ["Ground beetle", "https://news.psu.edu/sites/default/files/styles/threshold-992/public/beetle%20Nick%20Sloff.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7Qdh7gM_knlH6iGdLe9JwJQ7XG2ilSySvA&usqp=CAU"],
                ["Miridae", "https://genent.cals.ncsu.edu/wp-content/uploads/2015/07/mirid04.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTly9bXUpwB6TaNPvP3f3RNbrATn7nToZbpr9nsYYbPeMgKP5dZ7GXCvClpciUpln4LoOI&usqp=CAU"],
                ["Waterbug", "https://media.australian.museum/media/dd/images/Giant_Water_Bug.width-800.72ee7dc.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0TlTw42bABptE1QHyzZ_09NJIFLOLnsndQ&usqp=CAU"]
            ]
            harmful = [["Rice Hispa", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hispine_from_Java_%286282966544%29.jpg/1200px-Hispine_from_Java_%286282966544%29.jpg",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU4od4_eyGk3hAogyy8u0h5XeT7L46H_Dofg&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkMQn3uY8KL4yNtHTY5Jg5bZhlMDEBXbJ3g&usqp=CAU"],

                       ["Yellow Stem Borer", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UWOig4QePUuz5jX4PhhG5ZNrGOw7vbbVAg&usqp=CAU",
                                                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIO1qxJgFZRoVEG-ZuAH2euwCKNV9T83-tsQ&usqp=CAU",
                                                 "https://lh3.ggpht.com/v8Jh0xxxM24WRzJ5l9Hz19oXaUZBsM7hFWY8M6s4sI0GEc92KembDXvUQQGettIGqQ45ISFfv0JNezvUtzZV=s580"],

                       ["Army Worm", "https://entnemdept.ufl.edu/creatures/field/fall_armyworm04.JPG",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZccxORANdoKQoVbywOuaCeXG5hTh8kFoLYA&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvtixTKPtAumUjT35DNZkva4wqg51QGstuiA&usqp=CAU"],

                       ["Planthopper","https://mdc.mo.gov/sites/default/files/styles/gallery_main_image/public/mo_nature/media/field-guide/Planthopper_Acanalonia_conica_7-5-15.JPG?itok=Dr6ewhvJ",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZP8PbbU4VJC_t6SAFc-fHOSLibYsCf74tmQ&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDp9LoFV9Jh3zUhsj-0wme-aWfP6Ub6nal2w&usqp=CAU"]]
        else:
            harmless = [
                ["Convergent Lady Beetle", "https://cdn.britannica.com/39/88139-050-D947E969/ladybird-beetle.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSwKPjkrm1gcG6ORluT3yHKvCMOXNqWdjiqA&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd2xMqya-s3uuIumNi4I00D9txjwDH0iWIw&usqp=CAU"],
                ["Seven-spotted Lady Beetle", "https://mdc.mo.gov/sites/default/files/styles/species_banner/public/mo_nature/media/images/2013/02/7_spot.jpg?h=62b3f559&itok=4prUOfWR", "https://www.thoughtco.com/thmb/RD7_oGeVK-xwkezcOTq-U8tWT3c=/2928x2196/smart/filters:no_upscale()/GettyImages-183139591-583cb4285f9b58d5b19de739.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOA3RviX7YFGIg5IUVqWZ93mMjTWU80U5dQ&usqp=CAU"],
                ["Soft-winged Flower Beetles", "https://bugguide.net/images/cache/UQF/01Q/UQF01QY0EQ1K0KEKSK9KGK9K4K9KSKEK5QT06Q6K2QEK5Q9KPQ6K2Q9K0KEK0KUK6QA04QF0GQ301QRSVQY05QNKEQ.jpg", "https://inaturalist-open-data.s3.amazonaws.com/photos/1398358/large.jpg?1544767153",
                 "https://inaturalist-open-data.s3.amazonaws.com/photos/1398358/large.jpg?1544767153"]
            ]

            harmful = [["Army Worm", "https://entnemdept.ufl.edu/creatures/field/fall_armyworm04.JPG",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZccxORANdoKQoVbywOuaCeXG5hTh8kFoLYA&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvtixTKPtAumUjT35DNZkva4wqg51QGstuiA&usqp=CAU"],

                       ["Hessian Fly", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW1DG5Vm-AzpmZJcmdRCLeKdRR_yL66uIM4JGUUcX66ewNspIR43yKfrA5bM2VLSy9JEI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsdalPF5Z4KbdXBH9dhTgpnGx9vIOB-rMIZw&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMEVN07HGY-Hnzhckg9t9XojnkGjeLDwFZ_yWyIanch3Cj4Dh3_v6Xyix32_-PPIT1PqQ&usqp=CAU"],

                       ["Stink Bug", "https://www.gannett-cdn.com/-mm-/c947c1050e1d37c3f2b3e882acd6624a4722e90d/c=0-265-2253-1538/local/-/media/Rochester/Rochester/2014/11/09/635511668589790283-155231507.jpg",
                        "https://woodstream.scene7.com/is/image/woodstream/ter-insects-brown-mamorated-stink-bug-article-1?$fullpng2$",
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

        response_scoring = requests.post(ML_URL,
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

    