#!/bin/bash
echo "******CREATING SONAR DATABASE******"
PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres <<- EOSQL
   CREATE USER sonar WITH PASSWORD 'sonar';
   CREATE DATABASE sonar WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE sonar to sonar;
EOSQL

echo "******SONAR DATABASE CREATED******"