FROM relateiq/oracle-java8

ENV JIRA_VERSION 7.5.1
ENV JIRA_HOME /opt/jira-home
ENV HOME /opt/jira-home
RUN apt-get update && apt-get install -y postgresql-client postgresql-contrib
RUN mkdir /opt/jira && \
    mkdir /opt/jira-home
RUN wget -O - \
      http://www.atlassian.com/software/jira/downloads/binary/atlassian-jira-software-${JIRA_VERSION}.tar.gz \
      | tar xzf - --strip=1 -C /opt/jira \
    && perl -i -p -e 's/^JVM_SUPPORT/#JVM_SUPPORT/' /opt/jira/bin/setenv.sh \
    && wget -O /opt/jira/lib/postgresql-42.2.2.jar \
      https://jdbc.postgresql.org/download/postgresql-42.2.2.jar
ADD jars/atlassian-extras-3.2.jar atlassian-extras-3.2.jar
ADD jars/atlassian-universal-plugin-manager-plugin-2.22.4.jar atlassian-universal-plugin-manager-plugin-2.22.4.jar
RUN cp -v atlassian-extras-3.2.jar /opt/jira/atlassian-jira/WEB-INF/lib/ && \
    cp -v atlassian-universal-plugin-manager-plugin-2.22.4.jar /opt/jira/atlassian-jira/WEB-INF/atlassian-bundled-plugins/
WORKDIR /opt/jira
VOLUME ["/opt/jira-home"]
EXPOSE 8080
ADD server.xml /opt/jira/conf/server.xml
ADD setup-jira-db.sh /opt/jira/setup-jira-db.sh
RUN chmod u+x /opt/jira/setup-jira-db.sh
ENV JVM_SUPPORT_RECOMMENDED_ARGS -Datlassian.plugins.enable.wait=300
ADD launch.sh /launch
RUN chmod u+x /launch
CMD ["/launch"]
