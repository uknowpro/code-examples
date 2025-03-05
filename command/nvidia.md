#### 호스트OS에서 docker의 gpu리소스(메모리 사용량) 확인
```
nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv,noheader | while IFS=',' read -r pid process mem; do
  container_id=$(docker ps -q | xargs -I {} sh -c "docker inspect --format='{{.Id}} {{.State.Pid}}' {} | grep ' $pid$' | awk '{print \$1}'")
  if [[ -n "$container_id" ]]; then
    container_name=$(docker inspect --format='{{.Name}}' $container_id | sed 's/^\///')
    echo "GPU Process: $process (PID: $pid, Memory: $mem) → Container: $container_id ($container_name)"
  fi
```
