#!/bin/bash
echo "******CREATING ERP DATABASES******"
PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres <<- EOSQL
   CREATE USER ofbiz WITH PASSWORD 'ofbiz';
   CREATE DATABASE ofbiz WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE ofbiz to ofbiz;
   CREATE DATABASE ofbiztenant WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE ofbiztenant to ofbiz;
   CREATE DATABASE ofbizolap WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' \
       TEMPLATE template0;
   GRANT ALL PRIVILEGES ON DATABASE ofbiz to ofbiz;
EOSQL
echo "******ERP DATABASE CREATED******"
if [ -r '/data.sql' ]; then
    echo "**IMPORTING ERP DATABASE BACKUP**"
    SERVER=$!; sleep 2
    PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres confluence < /data.sql
    kill $SERVER; wait $SERVER
    echo "**ERP DATABASE BACKUP IMPORTED***"
fi
