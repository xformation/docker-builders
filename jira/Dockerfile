FROM relateiq/oracle-java8

ENV JIRA_VERSION 7.5.1
ENV JIRA_HOME /opt/jira-home
ENV HOME /opt/jira-home

RUN mkdir /opt/jira && \
    mkdir /opt/jira-home
RUN wget -O - \
      http://www.atlassian.com/software/jira/downloads/binary/atlassian-jira-software-${JIRA_VERSION}.tar.gz \
      | tar xzf - --strip=1 -C /opt/jira \
    && perl -i -p -e 's/^JVM_SUPPORT/#JVM_SUPPORT/' /opt/jira/bin/setenv.sh \
    && wget -O /opt/jira/lib/postgresql-42.2.2.jar \
      https://jdbc.postgresql.org/download/postgresql-42.2.2.jar

WORKDIR /opt/jira
VOLUME ["/opt/jira-home"]
ADD setup-jira-db.sh /opt/jira/setup-jira-db.sh
ENV JVM_SUPPORT_RECOMMENDED_ARGS -Datlassian.plugins.enable.wait=300
ADD launch.sh /launch
CMD ["/launch"]
