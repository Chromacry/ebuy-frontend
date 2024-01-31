#!/bin/bash
#* Configuration
export kube_config_filedrive="c"
export your_windows_account_username="" #* Enter your windows account username
export KUBECONFIG=/mnt/$kube_config_filedrive/Users/$your_windows_account_username/.kube/config

kubectl scale deployment projectx-frontend-deployment --replicas=0
kubectl delete deployment projectx-frontend-deployment
kubectl delete service projectx-frontend-service
az aks delete --resource-group "dvopsResourceGroup" --name "dvopsAKSCluster" --yes --no-wait