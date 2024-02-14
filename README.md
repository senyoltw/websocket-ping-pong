# websocket-ping-pong
test nodejs server

# pull image
https://quay.io/repository/rh_tawatana/websocket-ping-pong?tab=info

# sample Deployment
```
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: websocket-ping-pong-ns
  name: websocket-ping-pong
spec:
  selector:
    matchLabels:
      app: websocket-ping-pong
  replicas: 3
  template:
    metadata:
      labels:
        app: websocket-ping-pong
    spec:
      containers:
        - name: websocket-ping-pong
          image: 'quay.io/rh_tawatana/websocket-ping-pong:latest'
          ports:
            - containerPort: 3000
              protocol: TCP
          env:
            - name: BACKGROUND_COLOR
              value: lightblue
              # value: lightgreen
```
