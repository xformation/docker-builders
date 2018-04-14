#!/bin/bash
echo "******CREATING JIRA DATABASE******"
psql -h ${DB_HOST} -p 5432 --username postgres --password postgres <<- EOSQL
   CREATE USER jira WITH PASSWORD 'jira';
   CREATE DATABASE jira WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE jira to jira;
EOSQL

echo "******JIRA DATABASE CREATED******"
