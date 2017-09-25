## 运行命令

`docker-compose up`

## 注意

1. 最好配置一个国内镜像，方便下载
2. 需要注意的是php-fpm.conf文件里的`daemonize = no`，否则根据docker特性PHP容器刚启动就会自动停止