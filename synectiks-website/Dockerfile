FROM alpine:3.6
ENV TIMEZONE America/Santiago
RUN apk update && apk upgrade
RUN apk add mariadb mariadb-client \
    apache2 \ 
    apache2-utils \
    curl wget vim htop \
    tzdata \
    php7-apache2 \
    php7-cli \
    php7-phar \
    php7-zlib \
    php7-zip \
    php7-bz2 \
    php7-ctype \
    php7-curl \
    php7-pdo_mysql \
    php7-mysqli \
    php7-json \
    php7-mcrypt \
    php7-xml \
    php7-dom \
    php7-iconv \
    php7-xdebug \
    php7-session

RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/bin --filename=composer
#
#    sed -i 's#AllowOverride none#AllowOverride All#' /etc/apache2/httpd.conf && \
#    sed -i 's#Require all denied#Require all granted#' /etc/apache2/httpd.conf && \
#    sed -i 's#^DocumentRoot ".*#DocumentRoot "/var/www/localhost/htdocs"#g' /etc/apache2/httpd.conf && \

# configure timezone, mysql, apache
RUN cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
    echo "${TIMEZONE}" > /etc/timezone && \
    mkdir -p /run/apache2 && chown -R apache:apache /run/apache2 && chown -R apache:apache /var/www/localhost/htdocs/ && \
    sed -i 's#\#LoadModule rewrite_module modules\/mod_rewrite.so#LoadModule rewrite_module modules\/mod_rewrite.so#' /etc/apache2/httpd.conf 

RUN sed -i 's#display_errors = Off#display_errors = On#' /etc/php7/php.ini && \
    sed -i 's#error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT#error_reporting = E_ALL#' /etc/php7/php.ini


# Configure xdebug
RUN echo "zend_extension=xdebug.so" > /etc/php7/conf.d/xdebug.ini && \ 
    echo -e "\n[XDEBUG]"  >> /etc/php7/conf.d/xdebug.ini && \ 
    echo "xdebug.remote_enable=1" >> /etc/php7/conf.d/xdebug.ini && \  
    echo "xdebug.remote_connect_back=1" >> /etc/php7/conf.d/xdebug.ini && \ 
    echo "xdebug.idekey=PHPSTORM" >> /etc/php7/conf.d/xdebug.ini && \ 
    echo "xdebug.remote_log=\"/tmp/xdebug.log\"" >> /etc/php7/conf.d/xdebug.ini

# Configure website files from github
RUN GIT_URL="https://github.com/synectiks-sddc/synectiks-website/archive/master.zip"; \
    DIR_TOCOPY="/var/www/localhost/htdocs/"; \
    cd $DIR_TOCOPY; \
    wget --no-check-certificate -O master.zip $GIT_URL; \
    unzip $DIR_TOCOPY/master.zip && mv synectiks-website-master/* .; \
    echo; echo; echo "List (13) $DIR_TOCOPY ..."; echo; ls -AlhF $DIR_TOCOPY; du -sh; echo; \
    rm $DIR_TOCOPY/master.zip; \
    echo; echo; echo "List (14) $DIR_TOCOPY ..."; echo; ls -AlhF $DIR_TOCOPY; du -sh; echo; 

COPY entry.sh /entry.sh

RUN chmod u+x /entry.sh

WORKDIR /var/www/localhost/htdocs/

EXPOSE 80

ENTRYPOINT ["/entry.sh"]
