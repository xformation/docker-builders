#!/bin/bash
set -e

. docker-java-home

# allow the container to be started with `--user`
if [ "$1" = 'bin/fisheyectl.sh' -a "$(id -u)" = '0' ]; then
    . /usr/local/share/atlassian/common.sh
    export FISHEYE_HOME;
    export FISHEYE_INST;
    if [ -n "$DATABASE_URL" ]; then
      extract_database_url "$DATABASE_URL" DB $FISHEYE_INST/lib
    fi
    chown -R $UID:$UID $FISHEYE_HOME
    chown -R $UID:$GID $FISHEYE_INST
    exec gosu $UID "$BASH_SOURCE" "$@"
fi

exec "$@"
