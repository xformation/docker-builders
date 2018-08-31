#!/bin/sh
set -o errexit
sh ./setup-erp-db.sh
sh ./start.sh 