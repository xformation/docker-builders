#!/bin/bash
echo "******CREATING CONFLUENCE DATABASE******"
PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres <<- EOSQL
   CREATE USER confluence WITH PASSWORD 'confluence';
   CREATE DATABASE confluence WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE confluence to confluence;
EOSQL
echo "******CONFLUENCE DATABASE CREATED******"