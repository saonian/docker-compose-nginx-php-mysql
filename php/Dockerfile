FROM php:7.4-fpm

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster main contrib non-free" >/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-updates main contrib non-free" >>/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-backports main contrib non-free" >>/etc/apt/sources.list && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian-security buster/updates main contrib non-free" >>/etc/apt/sources.list

RUN rm /etc/apt/preferences.d/no-debian-php

RUN export CFLAGS="$PHP_CFLAGS" CPPFLAGS="$PHP_CPPFLAGS" LDFLAGS="$PHP_LDFLAGS" \
    && apt-get update && apt-get install -y --no-install-recommends \
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
        libzip-dev \
        zip \
        unzip \
        openssl \
        libssl-dev \
        vim \
        cron \
        libonig-dev \
        ghostscript \
        libmagickwand-dev \
    && docker-php-ext-install -j$(nproc) mysqli pdo_mysql sockets soap opcache intl bcmath zip \
    # php7.4 已经包含这些模块，无需再安装 iconv mbstring curl hash tokenizer xml pdo，重复安装可能会报错.
    # && docker-php-ext-install -j$(nproc) iconv mysqli pdo pdo_mysql mbstring tokenizer xml sockets soap curl hash opcache intl bcmath \
    # php7.4配置参数有变更，去掉了-dir
    # && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN pecl install redis \
    && pecl install mcrypt-1.0.3 \
    && pecl install mongodb \
    && pecl install memcached-3.1.5 \
    && pecl install -o -f xdebug \
    && pecl install imagick-3.4.4 \
    && docker-php-ext-enable redis mongodb memcached xdebug mcrypt imagick \
    && rm -rf /tmp/pear

ENV TZ=Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get purge -y g++ \
    && apt-get autoremove -y \
    && rm -r /var/lib/apt/lists/* \
    && rm -rf /tmp/*

EXPOSE 9000

CMD ["php-fpm"]