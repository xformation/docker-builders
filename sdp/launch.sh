#!/bin/bash
set -o errexit
/setup-sdp-db.sh
/start-simulator.sh
/run.sh