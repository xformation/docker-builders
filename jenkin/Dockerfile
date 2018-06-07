FROM jenkins/jenkins:2.107.3-alpine
USER root
RUN apk update && apk upgrade
RUN apk add docker
RUN apk add --update mysql && rm -f /var/cache/apk/*
RUN apk add --update make cmake gcc g++ gfortran
RUN apk add --update python py-pip python-dev
RUN pip install sceptre
RUN pip install troposphere
ENV JENKINS_REF /usr/share/jenkins/ref

# install jenkins plugins
COPY jenkins-home/plugins.txt $JENKINS_REF/
RUN /usr/local/bin/plugins.sh $JENKINS_REF/plugins.txt

ENV JAVA_OPTS -Dorg.eclipse.jetty.server.Request.maxFormContentSize=100000000 \
 			  -Dorg.apache.commons.jelly.tags.fmt.timeZone=America/Los_Angeles \
 			  -Dhudson.diyChunking=false \
 			  -Djenkins.install.runSetupWizard=false

# copy scripts and ressource files
COPY jenkins-home/*.* $JENKINS_REF/
COPY jenkins-home/userContent $JENKINS_REF/userContent
COPY jenkins-home/jobs $JENKINS_REF/jobs/
COPY jenkins-home/init.groovy.d $JENKINS_REF/init.groovy.d/
COPY jenkins-home/dsl $JENKINS_REF/dsl/
