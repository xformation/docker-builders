FROM python:2.7.15-alpine3.7
RUN apk update && apk add --update python-dev py-pip gcc  make g++ zlib-dev postgresql-dev postgresql-client postgresql-contrib && rm -rf /var/cache/apk/*