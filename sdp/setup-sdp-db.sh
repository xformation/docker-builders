#!/bin/bash
echo "******CREATING SDP DATABASE******"
PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres <<- EOSQL
   CREATE USER sdp WITH PASSWORD 'sdp';
   CREATE DATABASE sdp WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE sdp to sdp;
EOSQL

echo "******SDP DATABASE CREATED******"
