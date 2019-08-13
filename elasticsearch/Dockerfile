FROM docker.elastic.co/elasticsearch/elasticsearch:5.6.4
MAINTAINER rajesh
ENV REGION us-east-1
ADD elasticsearch.yml /usr/share/elasticsearch/config/
USER root

RUN chown elasticsearch:elasticsearch config/elasticsearch.yml

USER elasticsearch
WORKDIR /usr/share/elasticsearch
RUN bin/elasticsearch-plugin install discovery-ec2 && bin/elasticsearch-plugin install repository-s3 && sed -e '/^-Xms5g/s/^/#/g' -i /usr/share/elasticsearch/config/jvm.options

ENV PATH=$PATH:/usr/share/elasticsearch/bin

CMD ["elasticsearch"]

EXPOSE 9200