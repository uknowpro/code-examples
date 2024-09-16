# kubectx CLI
## context
kubectx

## change context
kubectx arn:aws:eks:ap-northeast-2:123123:cluster/dev-seoul-v1-24

## services by namespace
kubectl get pods --namespace temp

# kubectl CLI
## port-forward
```
kubectl port-forward --namespace ns-infra svc/service-name 3356:15672
```
