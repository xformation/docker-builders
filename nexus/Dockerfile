FROM alpine
LABEL maintener="pokido99@gmail.com"

# Install Java
RUN apk --no-cache add openjdk8-jre

# Install misc tools
RUN apk --no-cache add curl tar

# Install Nexus
ARG SONATYPE_HOME=/opt/sonatype
ARG NEXUS_USER=nexus
ARG NEXUS_USER_GID=5205
ARG NEXUS_VERSION=3.5.2-01
ARG NEXUS_HOME=${SONATYPE_HOME}/nexus-home
ARG NEXUS_DOWNLOAD_URL=https://sonatype-download.global.ssl.fastly.net/nexus/3/nexus-${NEXUS_VERSION}-unix.tar.gz

ENV SONATYPE_HOME=${SONATYPE_HOME} \
    NEXUS_HOME=${NEXUS_HOME}

ADD ${NEXUS_DOWNLOAD_URL} /tmp/nexus.tar.gz

RUN mkdir -p ${SONATYPE_HOME} && \
    gunzip /tmp/nexus.tar.gz && \
    tar -x -C ${SONATYPE_HOME} -f /tmp/nexus.tar && \
    rm -f /tmp/nexus.tar

RUN addgroup -g ${NEXUS_USER_GID} ${NEXUS_USER} && \
    adduser -h ${NEXUS_HOME} -s /bin/sh -u ${NEXUS_USER_GID} -D -G ${NEXUS_USER} -H ${NEXUS_USER} && \
    chown -R ${NEXUS_USER}:${NEXUS_USER} ${SONATYPE_HOME}

USER ${NEXUS_USER}

EXPOSE 8081

WORKDIR ${NEXUS_HOME}

CMD ["bin/nexus", "run"]