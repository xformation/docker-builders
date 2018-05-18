FROM relateiq/oracle-java8

ENV CROWD_VERSION 3.2.1
ENV CROWD_HOME /opt/crowd-home
ENV HOME /opt/crowd-home
RUN apt-get update && apt-get install -y postgresql postgresql-contrib
RUN mkdir /opt/crowd && \
    mkdir /opt/crowd-home
RUN wget -O - \
      https://product-downloads.atlassian.com/software/crowd/downloads/atlassian-crowd-${CROWD_VERSION}.tar.gz \
      | tar xzf - --strip=1 -C /opt/crowd \
    && perl -i -p -e 's/^JVM_SUPPORT/#JVM_SUPPORT/' /opt/crowd/apache-tomcat/bin/setenv.sh \
    && wget -O /opt/crowd/apache-tomcat/lib/postgresql-42.1.1.jar \
      https://jdbc.postgresql.org/download/postgresql-42.1.1.jar
ADD jars/atlassian-extras-3.2.jar atlassian-extras-3.2.jar
ADD crowd-init.properties crowd-init.properties 
RUN cp -v atlassian-extras-3.2.jar /opt/crowd/crowd-webapp/WEB-INF/lib/ && \
    cp -v crowd-init.properties /opt/crowd/crowd-webapp/WEB-INF/classes/crowd-init.properties
WORKDIR /opt/crowd/
VOLUME ["/opt/crowd-home"]
EXPOSE 8095
ADD server.xml /opt/crowd/apache-tomcat/conf/server.xml
ADD setup-crowd-db.sh /opt/crowd/setup-crowd-db.sh
RUN chmod u+x /opt/crowd/setup-crowd-db.sh
ENV JVM_SUPPORT_RECOMMENDED_ARGS -Datlassian.plugins.enable.wait=300
ADD launch.sh /launch
RUN chmod u+x /launch
CMD ["/launch"]

