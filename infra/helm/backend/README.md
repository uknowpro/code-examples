### 추가설명
* 컨테이너내에서 curl 이 필요함.
* deployment에 graceful shutdown을 위한 라벨변경 처리가 적용되어 있음.
  - pod에 shutdown signal을 전달하기전에 service -> pod 로의 트래픽을 차단하기 위함.