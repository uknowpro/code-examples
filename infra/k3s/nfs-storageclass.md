```bash
kubectl get storageclasses

NAME                   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path (default)   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  0h05m
```

```bash
sudo nano /var/lib/rancher/k3s/server/manifests/helm-controller.yaml

apiVersion: v1
kind: Namespace
metadata:
  name: nfs
---
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: nfs
  namespace: nfs
spec:
  chart: nfs-subdir-external-provisioner
  repo: https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner
  targetNamespace: nfs
  set:
    nfs.server: x.x.x.x # IP of the NFS server or fqdn
    nfs.path: /volume1/k3s-storage # path to the NFS share
    storageClass.name: nfs
```

```bash
kubectl get storageclasses

NAME                   PROVISIONER                                         RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path (default)   rancher.io/local-path                               Delete          WaitForFirstConsumer   false                  6d3h
nfs                    cluster.local/nfs-nfs-subdir-external-provisioner   Delete          Immediate              true                   1s
```
