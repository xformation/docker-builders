FROM java:8-jdk-alpine

ENV ERP_VERSION 1.0.0
ENV ERP_TGZ_URL https://s3.amazonaws.com/sdp-releases/v$ERP_VERSION.tar.gz
ENV ERP_HOME /opt/erp

ENV PATH $ERP_HOME/bin:$PATH
RUN mkdir -p "$ERP_HOME"
WORKDIR $ERP_HOME

RUN set -x \
	&& apk add --no-cache --virtual .fetch-deps \
		ca-certificates \
		tar \
		openssl \	
	&& wget -O erp.tar.gz "$ERP_TGZ_URL" \
	&& tar -xvf erp.tar.gz --strip-components=1 \
	&& find . -type f -print0 | xargs -0 dos2unix \
	&& rm erp.tar.gz* 
ADD setup-erp-db.sh /opt/erp/setup-erp-db.sh
RUN chmod u+x /opt/erp/setup-erp-db.sh
ADD launch.sh /launch
RUN chmod u+x /launch
ADD dump.sql /dump.sql
ADD tenant.sql /tenant.sql
ADD olap.sql /olap.sql
# RUN chmod u+x /opt/erp/start.sh
EXPOSE 8080 8443 8983
CMD ["sh", "./start.sh"]
# CMD ["/launch"]