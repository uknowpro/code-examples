# CLI
## Install or Upgrade
```
helm pull oci://registry-1.docker.io/bitnamicharts/node-exporter --untar helm upgrade --namespace ns-infra --install node-exporter -f values-override.yaml ./
```
```
helm upgrade --namespace ns-infra --install grafana -f values-override.yaml ./
```
