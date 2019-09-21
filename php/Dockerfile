FROM php:7.2-fpm

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster main contrib non-free" >/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-updates main contrib non-free" >>/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-backports main contrib non-free" >>/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian-security buster/updates main contrib non-free" >>/etc/apt/sources.list

RUN rm /etc/apt/preferences.d/no-debian-php

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        libxml2-dev \
        php-soap \
        libcurl4-gnutls-dev \
        zlib1g-dev \
        libicu-dev \
        libmemcached-dev \
        git \
        zip \
        unzip \
        openssl \
        libssl-dev \
        vim \
        cron \
    && docker-php-ext-install -j$(nproc) iconv mysqli pdo pdo_mysql mbstring tokenizer xml sockets soap curl hash opcache intl bcmath \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN pecl install redis \
    && pecl install mcrypt-1.0.1 \
    && pecl install mongodb \
    && pecl install memcached-3.0.3 \
    && pecl install -o -f xdebug \
    && docker-php-ext-enable redis mongodb memcached xdebug mcrypt \
    && rm -rf /tmp/pear

ENV TZ=Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get purge -y g++ \
    && apt-get autoremove -y \
    && rm -r /var/lib/apt/lists/* \
    && rm -rf /tmp/*

EXPOSE 9000

CMD ["php-fpm"]