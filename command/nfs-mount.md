### install
```bash
sudo apt install -y nfs-common cifs-utils
```

### mount
```bash
sudo mount -t nfs -o vers=3 $NAS_HOST:/volume1/$DIR /$MOUNT_DIR
```
