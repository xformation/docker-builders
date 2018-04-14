FROM alpine:3.4

# URL to upload the backup to in S3.
ENV BACKUP_URL s3://toy-jenkins-config/jenkins-backup.tar

# Cron time expression for when to run the backup job.
ENV BACKUP_SCHEDULE 0 * * * *

# Add AWS for downloading from S3
RUN apk update && apk add bash curl python && curl -O https://bootstrap.pypa.io/get-pip.py && \
    python get-pip.py && pip install awscli && rm get-pip.py

COPY files/backup.sh /usr/local/bin/
COPY files/backupcmd.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/backup.sh
RUN chmod +x /usr/local/bin/backupcmd.sh

ENTRYPOINT ["/usr/local/bin/backup.sh"]
