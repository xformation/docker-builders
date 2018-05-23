#!/bin/bash -e

PERMISSIONS_OK=0

if [ ! -r "$SDP_PATHS_CONFIG" ]; then
    echo "SDP_PATHS_CONFIG='$SDP_PATHS_CONFIG' is not readable."
    PERMISSIONS_OK=1
fi

if [ ! -w "$SDP_PATHS_DATA" ]; then
    echo "SDP_PATHS_DATA='$SDP_PATHS_DATA' is not writable."
    PERMISSIONS_OK=1
fi

if [ ! -r "$SDP_PATHS_HOME" ]; then
    echo "SDP_PATHS_HOME='$SDP_PATHS_HOME' is not readable."
    PERMISSIONS_OK=1
fi

if [ $PERMISSIONS_OK -eq 1 ]; then
    echo "You may have issues with file permissions, more information here: http://docs.SDPormation.org/installation/docker/#migration-from-a-previous-version-of-the-docker-container-to-5-1-or-later"
fi

if [ ! -d "$SDP_PATHS_PLUGINS" ]; then
    mkdir "$SDP_PATHS_PLUGINS"
fi


if [ ! -z ${SDP_AWS_PROFILES+x} ]; then
    > "$SDP_PATHS_HOME/.aws/credentials"

    for profile in ${SDP_AWS_PROFILES}; do
        access_key_varname="SDP_AWS_${profile}_ACCESS_KEY_ID"
        secret_key_varname="SDP_AWS_${profile}_SECRET_ACCESS_KEY"
        region_varname="SDP_AWS_${profile}_REGION"

        if [ ! -z "${!access_key_varname}" -a ! -z "${!secret_key_varname}" ]; then
            echo "[${profile}]" >> "$SDP_PATHS_HOME/.aws/credentials"
            echo "aws_access_key_id = ${!access_key_varname}" >> "$SDP_PATHS_HOME/.aws/credentials"
            echo "aws_secret_access_key = ${!secret_key_varname}" >> "$SDP_PATHS_HOME/.aws/credentials"
            if [ ! -z "${!region_varname}" ]; then
                echo "region = ${!region_varname}" >> "$SDP_PATHS_HOME/.aws/credentials"
            fi
        fi
    done

    chmod 600 "$SDP_PATHS_HOME/.aws/credentials"
fi

if [ ! -z "${SDP_INSTALL_PLUGINS}" ]; then
  OLDIFS=$IFS
  IFS=','
  for plugin in ${SDP_INSTALL_PLUGINS}; do
    IFS=$OLDIFS
    SDPormation-cli --pluginsDir "${SDP_PATHS_PLUGINS}" plugins install ${plugin}
  done
fi

exec sdp-server                                         \
  --homepath="$SDP_PATHS_HOME"                               \
  --config="$SDP_PATHS_CONFIG"                               \
  "$@"                                                      \
  cfg:default.log.mode="console"                            \
  cfg:default.paths.data="$SDP_PATHS_DATA"                   \
  cfg:default.paths.logs="$SDP_PATHS_LOGS"                   \
  cfg:default.paths.plugins="$SDP_PATHS_PLUGINS"             \
  cfg:default.paths.provisioning="$SDP_PATHS_PROVISIONING"