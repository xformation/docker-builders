#!/bin/bash
if [ "$1" == "--no-cron" ]; then
 echo "Backing up once"
 /usr/local/bin/backupcmd.sh $BACKUP_URL
else
 crontab -l > /tmp/cron && \
 echo "$BACKUP_SCHEDULE /usr/local/bin/backupcmd.sh $BACKUP_URL" >> /tmp/cron && \
 crontab /tmp/cron && crond -f
fi
