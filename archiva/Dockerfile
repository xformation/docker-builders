#
# Apache Archiva Standalone
#

FROM java

MAINTAINER drajeshreddi@gmail.com

ENV VERSION 2.1.1

RUN curl -sSLo /apache-archiva-$VERSION-bin.tar.gz http://archive.apache.org/dist/archiva/$VERSION/binaries/apache-archiva-$VERSION-bin.tar.gz \
  && tar --extract --ungzip --file apache-archiva-$VERSION-bin.tar.gz --directory / \
  && rm /apache-archiva-$VERSION-bin.tar.gz && mv /apache-archiva-$VERSION /apache-archiva

RUN useradd -d /apache-archiva/data -m archiva \
  && rm /apache-archiva/conf/archiva.xml \
  && ln -s /apache-archiva/data/archiva.xml /apache-archiva/conf/archiva.xml \
  && mkdir /apache-archiva/repositories \
  && chown archiva:archiva /apache-archiva/logs /apache-archiva/repositories /apache-archiva/temp


ENV ARCHIVA_BASE /apache-archiva
WORKDIR /apache-archiva

USER archiva

VOLUME /apache-archiva/data
VOLUME /apache-archiva/logs
VOLUME /apache-archiva/repositories
VOLUME /apache-archiva/temp
VOLUME /apache-archiva/conf

EXPOSE 8080
CMD bin/archiva console
