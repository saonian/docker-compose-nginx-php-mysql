## 运行命令

`docker-compose up`

## 注意

1. 最好配置一个国内镜像，方便下载

2. 需要注意的是php-fpm.com和www.conf文件里的配置：

   `daemonize = no` - 否则根据docker特性PHP容器刚启动就会自动停止

   `listen = [::]:9000` - 否则nginx不能通过php-fpm:9000来访问