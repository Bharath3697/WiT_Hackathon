**Submission or project name**

A basic GitHub repository example for new Call for Code projects and those that join the Call for Code with Turbo Dynamic. You can make this as simple or as in-depth as you need. And don't forget to register for Call for Code 2021!

## Make a “U” Turn: Extravagant to Resourceful

\*\*Short Description

**What’s the Problem?\*\***

Realizing the importance of green practices at home or at workplace or in the society in general, can help reduce waste, conserve resources, improve air, soil and water quality, and protect ecosystems and biodiversity.
Despite being aware of the destruction, it is causing to the ecosystem, we continue indulging in production of irreversible & harmful waste products and engaging in detrimental practices.
The designed application will update the users on how we are contributing to this destruction by producing volume of harmful waste products. This application will also recommend solutions & ways to mitigate and overcome the situation.

**The Idea**

1. To start with, we immensely contribute to the “CO2 emission percentage”, and # years of reserve oil left is scaring. As an alternative, we can opt for using Biogas to save our environment. However, the challenge of producing Biogas is due to unavailability of adequate raw materials. The application will provide means of selling the wasted products like food, papers, crop residue as raw material for Biogas.
2. There is also the issue on the amount of food being wasted, % of people hungry, % of people below poverty line. Instead of throwing the food into the bin, if there would be any means and resources to feed the hungry it will make our world a better place to live in. The application will provide means of donating the surplus food,clothes any useful item for fellow humans.
3. To add on, indiscriminate usage of chemical pesticides and fertilizers have a devastating effect on our entire ecosystem. They directly impact the helpful insects/pests, soil quality, water usage. The application will recommend the crop to be harvested based on the soil type, temperature, rainfall, etc. Based on the recommendation, it will also exhibit the harmful and beneficial pest for the crop.
4. The application provides some additional benefits to the users. Emission from fueled vehicles is a key contributor for poor air quality. Car pooling, is one of the options available to reduce vehicle emissions. The app will courage car pooling by providing “bio coins” to users(which they can redeem later for purchase), once they provide valid invoice for car pooling/sharing.

**Benefit**

Generate awareness to convert waste products to cheap, eco friendly energy, philanthropic approach to society by redistributing surplus food to the under privileged. Minimize the environmental degradation.

**Demo Video**

Link – https://www.youtube.com/watch?v=LsO5o3aw0KY

**The Architecture**

![image](https://user-images.githubusercontent.com/49307991/122602622-c8f06d80-d090-11eb-9f74-1ddb6aab1a28.png)

**Project Roadmap**

The application is hosted in a free tier IBM Cloud Kubernetes cluster. which will be hosted on openshift or on standard teir plan

Create merchant account in OLA to cross check the authenticity of pool sharing receipt uploaded

Integrate zoop api's to validate electricity consumption bill

Currently GreenHouse Marketplace and Donation is a self service platform. In future add a mediator, or delivery service for the items ordered/purchased through GreenHouse

Blockchain technology to be added for every transaction done through GreenHouse and rewarding of BioCoins can be made as a cryptocurrency

Add more Harmful/Harmless pests to the pest detection field

Add crop disease detection and pest detection

Add more features to weather forecast (flood, cyclone warning)

**Getting Started**

In this section you add the instructions to run your project on your local machine for development and testing purposes. You can also add instructions on how to deploy the project in production.

## Deployment to Docker :

Fill the env file :

SECRET_KEY= {add a random key here ex: 9uqp%ss\*(0g44p3+np2-&7#a0h5swe#l!%(6@\$r7!32_54@9807!5 }

DEBUG=False

WEATHER_API_KEY= {use your ibm weatherapi key}

ML_API_KEY= {use watson studio ml api key}

ML_URL= {use the ml crop recommendation model url}

Run docker-compose up

## Deployment on Kubernetes

Use the yaml files inside kubernetes_deployment folder to deploy

fill the env-configmap.yml

Link : https://cloud.ibm.com/docs?tab=deploy

## Run in local :

1. FrontEnd :

cd to frontend/gui/

npm install

npm start

2. Backend :

cd greenhouse/

pip install -r requirements.txt

python manage.py migrate

python server.py

## **Live Demo**

You can find a running system to test at http://169.51.207.117:30737/home

## **Built With**

React JS

django

IBM Cloud Kubernetes Cloud

Postgre SQL
