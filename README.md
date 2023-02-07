# 学习在 Docker 容器中进行开发

## 构建一个镜像

根据 `Dockerfile` 构建 image.

这个 `.` 是指 `Dockerfile` 所在的上下文, 这里就是当前目录.

```sh
docker build -t learn-docker .
```

## 通过镜像运行容器

通过某个镜像, 运行容器, 并指定容器运行的配置.

```sh
docker run -v `pwd`:/app -v /app/node_modules -d -p 4000:5000 --env-file ./.env --name devInDocker learn-docker
```

遇到的问题:

执行下面命令运行起来的时候, 提示不能在 readonly 的磁盘上写.  可能在现在, docker 对volume:ro的方式已经变了. 所以先继续下去, 先不用 ro 的方式.

```sh
docker run -v `pwd`:/app:ro -v /app/node_modules -d -p 3000:3000 --name devInDocker learn-docker

---> Error:
2242a7c433946310604c660063bf6b993e5e38c4b0ad6e584e08c986a994a473
docker: Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: error mounting "/var/lib/docker/volumes/91b66976c9116b45c551e16626eb8686f3b5bd624393b05f8f3b7baa1eb1abdc/_data" to rootfs at "/app/node_modules": mkdir /var/lib/docker/overlay2/fb130a72f92311f43395f4031bb5e97aab9265bf478d0e69a11d84bc6fa77e29/merged/app/node_modules: read-only file system: unknown.
```


