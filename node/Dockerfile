FROM keymetrics/pm2:latest-jessie

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN pm2 install pm2-auto-pull
RUN pm2 install pm2-server-monit

# Show current folder structure in logs
# RUN ls -al -R

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8360

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]