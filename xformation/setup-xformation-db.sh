#!/bin/bash
echo "******CREATING XFORMATION DATABASE******"
PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres <<- EOSQL
   CREATE USER xformation WITH PASSWORD 'xformation';
   CREATE DATABASE xformation WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE xformation to xformation;
EOSQL

echo "******XFORMATION DATABASE CREATED******"
