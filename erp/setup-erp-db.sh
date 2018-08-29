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
if [ -r '/dump.sql' ]; then
    echo "**IMPORTING ERP ofbiz DATABASE BACKUP**"
    SERVER=$!; sleep 2
    PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres ofbiz < /dump.sql
    kill $SERVER; wait $SERVER
    echo "**ERP OFBIZ DATABASE BACKUP IMPORTED***"
fi
if [ -r '/tenant.sql' ]; then
    echo "**IMPORTING ERP ofbiz tenant DATABASE BACKUP**"
    SERVER=$!; sleep 2
    PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres ofbiztenant < /tenant.sql
    kill $SERVER; wait $SERVER
    echo "**ERP OFBIZ TENANT DATABASE BACKUP IMPORTED***"
fi
if [ -r '/olap.sql' ]; then
    echo "**IMPORTING ERP ofbiz OLAP DATABASE BACKUP**"
    SERVER=$!; sleep 2
    PGPASSWORD=postgres psql -h ${DB_HOST} -p 5432 --username postgres ofbizolap < /olap.sql
    kill $SERVER; wait $SERVER
    echo "**ERP OFBIZ OLAP DATABASE BACKUP IMPORTED***"
fi
