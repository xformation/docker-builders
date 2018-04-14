#!/bin/bash
TARFILE=/tmp/backup.tar
export GZIP=-9

n=0
until [ $n -ge 2]
do
    tar czhf $TARFILE /var/jenkins_home/ --exclude "archive" --exclude "target" --exclude "/var/lib/jenkins/.m2/repository" --exclude "workspace"

    if tar tzf $TARFILE &> /dev/null; then
        aws s3 cp $TARFILE $1 &&break
    fi
    
    n=$[$n+1]
    sleep 5
done

rm $TARFILE
