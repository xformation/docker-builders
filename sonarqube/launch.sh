#!/bin/bash
set -o errexit
/opt/sonarqube/setup-sonar-db.sh
/opt/sonarqube/bin/run.sh