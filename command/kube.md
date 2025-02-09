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

#### k3s node install
```bash
sudo curl -sfL https://get.k3s.io | K3S_URL=https://192.168.35.141:6443 K3S_TOKEN= sh -
```

```bash
mkdir .kube
```

```bash
scp /etc/rancher/k3s/k3s.yaml uknow@192.168.35.76:/home/uknow/.kube/k3s.yaml
```

```bash
echo 'export KUBECONFIG=/home/uknow/.kube/k3s.yaml' >> ~/.bashrc
source ~/.bashrc
```
