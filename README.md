## Setting up project Starwars search.

### Setup for local use with Docker

1. Install [Docker Community Edition (CE)](https://docs.docker.com/install/) on your workstation.
2. Run starwars search project:

```
docker-compose up
```

3. Open web browser http://localhost/

### Setup to use on Google Cloud platform kubernetes

1. [Install the Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts), which includes the gcloud command-line tool.
2. Using the gcloud command line tool, install the [Kubernetes](https://kubernetes.io) command-line tool. kubectl is used to communicate with Kubernetes, which is the cluster orchestration system of Kubernetes Engine clusters:

```
gcloud components install kubectl
```

3. Install [Docker Community Edition (CE)](https://docs.docker.com/install/) on your workstation. You will use this to build a container image for the application.
4. Install the [Git source control tool](https://git-scm.com/downloads) to fetch the sample application from GitHub.
5. Create a new project name starwars in google cloud platform.
6. To save time typing your project ID and Compute Engine zone options in the gcloud command-line tool, you can set default configuration values by running the following commands:

```
gcloud config set project starwars
gcloud config set compute/zone us-central1-b
```

#### Step 1: Build and upload the container images

1. Go to api folder:

```
docker build -t gcr.io/starwars/swapi_api:v1 .
gcloud docker -- push gcr.io/starwars/swapi_api:v1
```

2. Go to webapp folder:

```
docker build -t gcr.io/starwars/swapi_webapp:v1 .
gcloud docker -- push gcr.io/starwars/swapi_webapp:v1
```

#### Step 2: Create a container cluster

```
gcloud container clusters create starwars --num-nodes=3
```

#### Step 3: Deploy your application

1. Go to main folder.

2. Create deployment pod:

```
kubectl create -f api-deployment.yaml
kubectl create -f angular-deployment.yaml

```

3. Create services:

```
kubectl create -f api-service.yaml
kubectl create -f angular-service.yaml

```

#### Step 4: Test your application

1. Go to Google Cloud Platform console.
2. Go to Kubernetes Engine.
3. Go to Discovery & load balancing.
4. Click on angular endpoint to start starwars search site.