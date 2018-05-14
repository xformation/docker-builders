
FROM node
MAINTAINER balaram
RUN adduser --disabled-password --gecos "" sinopia
RUN mkdir -p /opt/sinopia/storage
WORKDIR /opt/sinopia
RUN npm install js-yaml sinopia
RUN chown -R sinopia:sinopia /opt/sinopia
USER sinopia
ADD /config.yaml /tmp/config.yaml
COPY start.sh /opt/sinopia/start.sh
RUN chmod +x /opt/sinopia/start.sh
CMD [/opt/sinopia/start.sh"]
EXPOSE 4873
VOLUME /opt/sinopia