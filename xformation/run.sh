#!/bin/bash -e

PERMISSIONS_OK=0

if [ ! -r "$XF_PATHS_CONFIG" ]; then
    echo "XF_PATHS_CONFIG='$XF_PATHS_CONFIG' is not readable."
    PERMISSIONS_OK=1
fi

if [ ! -w "$XF_PATHS_DATA" ]; then
    echo "XF_PATHS_DATA='$XF_PATHS_DATA' is not writable."
    PERMISSIONS_OK=1
fi

if [ ! -r "$XF_PATHS_HOME" ]; then
    echo "XF_PATHS_HOME='$XF_PATHS_HOME' is not readable."
    PERMISSIONS_OK=1
fi

if [ $PERMISSIONS_OK -eq 1 ]; then
    echo "You may have issues with file permissions, more information here: http://docs.xformation.org/installation/docker/#migration-from-a-previous-version-of-the-docker-container-to-5-1-or-later"
fi

if [ ! -d "$XF_PATHS_PLUGINS" ]; then
    mkdir "$XF_PATHS_PLUGINS"
fi


if [ ! -z ${XF_AWS_PROFILES+x} ]; then
    > "$XF_PATHS_HOME/.aws/credentials"

    for profile in ${XF_AWS_PROFILES}; do
        access_key_varname="XF_AWS_${profile}_ACCESS_KEY_ID"
        secret_key_varname="XF_AWS_${profile}_SECRET_ACCESS_KEY"
        region_varname="XF_AWS_${profile}_REGION"

        if [ ! -z "${!access_key_varname}" -a ! -z "${!secret_key_varname}" ]; then
            echo "[${profile}]" >> "$XF_PATHS_HOME/.aws/credentials"
            echo "aws_access_key_id = ${!access_key_varname}" >> "$XF_PATHS_HOME/.aws/credentials"
            echo "aws_secret_access_key = ${!secret_key_varname}" >> "$XF_PATHS_HOME/.aws/credentials"
            if [ ! -z "${!region_varname}" ]; then
                echo "region = ${!region_varname}" >> "$XF_PATHS_HOME/.aws/credentials"
            fi
        fi
    done

    chmod 600 "$XF_PATHS_HOME/.aws/credentials"
fi

if [ ! -z "${XF_INSTALL_PLUGINS}" ]; then
  OLDIFS=$IFS
  IFS=','
  for plugin in ${XF_INSTALL_PLUGINS}; do
    IFS=$OLDIFS
    xformation-cli --pluginsDir "${XF_PATHS_PLUGINS}" plugins install ${plugin}
  done
fi

exec xformation-server                                         \
  --homepath="$XF_PATHS_HOME"                               \
  --config="$XF_PATHS_CONFIG"                               \
  "$@"                                                      \
  cfg:default.log.mode="console"                            \
  cfg:default.paths.data="$XF_PATHS_DATA"                   \
  cfg:default.paths.logs="$XF_PATHS_LOGS"                   \
  cfg:default.paths.plugins="$XF_PATHS_PLUGINS"             \
  cfg:default.paths.provisioning="$XF_PATHS_PROVISIONING"