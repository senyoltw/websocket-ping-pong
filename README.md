# websocket-ping-pong
test nodejs server

# pull image
https://quay.io/repository/rh_tawatana/websocket-ping-pong?tab=info

# sample Deployment
```
---
apiVersion: apps/v1
kind: Deployment
metadata:
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

---
apiVersion: v1
kind: Service
metadata:
  name: websocket-ping-pong
spec:
  selector:
    app: websocket-ping-pong
  ports:
    - name: 3000-tcp
      protocol: TCP
      port: 3000
      targetPort: 3000

---
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: websocket-ping-pong
spec:
  path: /
  to:
    kind: Service
    name: websocket-ping-pong
    weight: 100
  port:
    targetPort: 3000-tcp
  wildcardPolicy: None
```
