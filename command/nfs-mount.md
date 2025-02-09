### install
```bash
sudo apt install -y nfs-common cifs-utils
```

### mount
```bash
sudo mount -t nfs -o vers=3 $NAS_HOST:/volume1/$DIR /$MOUNT_DIR
```
#### example
```bash
sudo mkdir -p /mnt/k3s-storage
sudo mount -t nfs -o vers=3 192.168.35.241:/volume1/k3s-storage /mnt/k3s-storage
sudo chmod -R 775 /mnt/k3s-storage
```
