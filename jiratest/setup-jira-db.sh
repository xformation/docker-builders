#!/bin/bash
echo "******CREATING JIRA TEST DATABASE******"
PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres <<- EOSQL
   CREATE USER jira WITH PASSWORD 'jira';
   CREATE DATABASE jiratest WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE jiratest to jira;
EOSQL

echo "******JIRA TEST DATABASE CREATED******"
#psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'my_db'" | grep -q 1 || psql -U postgres -c "CREATE DATABASE my_db"
