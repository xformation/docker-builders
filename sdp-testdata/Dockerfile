
FROM node:latest
MAINTAINER Papu Bhattacharya <papu.bhattacharya@synectiks.com>

RUN npm install -g json-server

WORKDIR /data
VOLUME /data
COPY ./data.json /data/data.json

EXPOSE 80
ADD run.sh /run.sh
ENTRYPOINT ["bash", "/run.sh"]
CMD []