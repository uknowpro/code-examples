
# K3S Cluster 구축

## Requirements
* 아래의 2가지 작업을 사전에 필수로 완료하여야 합니다
### 1. Docker
```
~$ sudo apt install docker.io
```
### 2. cgroup
```
~$ sudo nano /boot/firmware/cmdline.txt

맨 뒤에 아래의 내용을 추가하고 저장
cgroup_memory=1 cgroup_enable=memory

저장 후 재부팅
~$ sudo reboot
```

## Master
```
~$ sudo curl -sfL https://get.k3s.io | sh -
```
```
~$ sudo hostnamectl set-hostname "k3s-master"
~$ sudo nano /etc/hosts
```

## Agent(Worker)
* 아래의 명령어로 마스터 노드에서 노드 토큰을 확인할 수 있습니다
```
~$ sudo cat /var/lib/rancher/k3s/server/node-token
```

```
~$ sudo curl -sfL https://get.k3s.io | K3S_URL=https://<master_node_ip>:6443 K3S_TOKEN=<your_token> sh -
```

```
~$ sudo hostnamectl set-hostname "k3s-node1"
~$ sudo nano /etc/hosts
```

## Example
```
~$ sudo kubectl get nodes -o wide
NAME                     STATUS   ROLES                  AGE    VERSION        INTERNAL-IP      EXTERNAL-IP   OS-IMAGE                         KERNEL-VERSION        CONTAINER-RUNTIME
k3s-master               Ready    control-plane,master   18h    v1.30.4+k3s1   192.168.35.141   <none>        Ubuntu 22.04.3 LTS               6.5.0-18-generic      docker://24.0.5
k3s-node1                Ready    <none>                 17h    v1.30.4+k3s1   192.168.35.198   <none>        Debian GNU/Linux 12 (bookworm)   6.6.47+rpt-rpi-2712   containerd://1.7.20-k3s1
k3s-node2                Ready    <none>                 69m    v1.30.4+k3s1   192.168.35.130   <none>        Debian GNU/Linux 12 (bookworm)   6.6.31+rpt-rpi-2712   containerd://1.7.20-k3s1
k3s-node3                Ready    <none>                 106m   v1.30.4+k3s1   192.168.35.233   <none>        Debian GNU/Linux 12 (bookworm)   6.6.31+rpt-rpi-2712   containerd://1.7.20-k3s1
k3s-node4                Ready    <none>                 99m    v1.30.4+k3s1   192.168.35.50    <none>        Debian GNU/Linux 12 (bookworm)   6.6.31+rpt-rpi-2712   containerd://1.7.20-k3s1
```
