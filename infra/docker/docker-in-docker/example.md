
아래의 예시는 ubuntu 도커이미지로 컨테이너를 생성하되, 호스트 머신의 도커소켓파일을 컨테이너 생성시 마운트시킵니다.
이를 통해서, 컨테이너에서도 호스트머신의 도커데몬과 커뮤니케이션이 가능합니다.
적용케이스에 따라서는 아래 명령어만으로는 부족할 수 있으며, Dockerfile의 커스터마이징 및 실행시의 추가옵션이 필요할 수 있습니다.

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock -it ubuntu
```
