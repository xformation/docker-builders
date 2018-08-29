#!/bin/bash
set -o errexit
/opt/erp/setup-erp-db.sh
/opt/erp/start.sh 