# projectx-frontend

## Authors

-Goh Zong Xian
-Si Thu Aung
-Yao Yutong
-Song Siong Pin Alston

## Description

This is the frontend application for the ProjectX platform.

## Prerequisites

Before running the application, make sure you have the following installed on your PC:

- Modern Browser
- Node.js (v18.18.0 or newer)

## Installation

To install dependencies, run the following command:
```bash
npm install
npm test
```

## Running

To run the app, after running, open http://localhost:5173/
```bash
npm run dev
```


## Automated Docker, Azure, Jenkins Deployment Setup
### Pre-setup requirements
- WSL2 (For windows 11)
- Install azure-cli
- Install docker
- Install jenkins
- Register for Docker Hub Account registration
- Register for Azure Cloud Account registration

### 1. Windows 11 WSL Linux Setup with docker & docker-compose for bash init shell script
```bash
#* Check if you have any wsl2 linux distro
wsl -l -v

#* Option 1: If no linux distro found run this
wsl --install -d Ubuntu
wsl --set-default Ubuntu

bash

sudo apt-get update
sudo apt install openjdk-17-jdk openjdk-17-jre -y
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
service docker status
service docker start


#* Option 2: Ignore if step 1 is done. If you see Ubuntu or any other Distro in ur wsl2 list
wsl --set-default ReplacewithNameofDistroInurWSL2List

```

### 2. Jenkins Configuration setup
- Setup the initial password first, onced completed run below
```bash
bash init-setup-jenkins-config.sh
```


### 3. Run Docker and Azure deployment
- Go into the init-deploy-setup.sh and change the following:
- 
```bash
bash init-deploy-setup.sh
```

## Optional 4. Manual Setup
#### Docker Build Image
```bash
docker login -u YourDockerUsername -p YourDockerPassword

docker tag YourDockerUsername/projectx-frontend-projectx-frontend:latest YourDockerUsername/projectx-frontend-projectx-frontend:latest
docker push YourDockerUsername/projectx-frontend-projectx-frontend:latest
```

#### Azure Init Deployment Setup
```bash
az login

az group create --name dvopsResourceGroup --location eastus
az aks create --resource-group dvopsResourceGroup --name dvopsAKSCluster --node-count 1 --generate-ssh-keys

az aks install-cli
az aks get-credentials --resource-group dvopsResourceGroup --name dvopsAKSCluster

kubectl apply -f deployment.yaml
kubectl apply -f deploy-service.yaml
kubectl get pods
kubectl get services
```

#### Azure login setup
- Get your id and replace with Your ID here and copy and paste that into jenkins build command.
```bash
az account show --query "id" --output tsv

az aks get-credentials --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster" --overwrite-existing --subscription "Your ID here"
```

#### Clean up azure
- Remove all clusters and namspaces and pods, services
```bash

kubectl scale deployment projectx-frontend-deployment --replicas=0
kubectl delete deployment projectx-frontend-deployment
kubectl delete service projectx-frontend-service
az aks delete --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster" --yes --no-wait
```