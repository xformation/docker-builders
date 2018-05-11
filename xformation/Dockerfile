FROM debian:stretch

ARG XFORMATION_URL="https://s3.amazonaws.com/xformation-releases/xformation-latest.linux-x64.tar.gz"
ARG XF_UID="472"
ARG XF_GID="472"

ENV PATH=/usr/share/xformation/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    XF_PATHS_CONFIG="/etc/xformation/xformation.ini" \
    XF_PATHS_DATA="/var/lib/xformation" \
    XF_PATHS_HOME="/usr/share/xformation" \
    XF_PATHS_LOGS="/var/log/xformation" \
    XF_PATHS_PLUGINS="/var/lib/xformation/plugins" \
    XF_PATHS_PROVISIONING="/etc/xformation/provisioning"
RUN apt-get update && apt-get install -y postgresql-client 
RUN apt-get update && apt-get install -qq -y tar libfontconfig curl ca-certificates && \
    mkdir -p "$XF_PATHS_HOME/.aws" && \
    curl "$XFORMATION_URL" | tar xfvz - --strip-components=1 -C "$XF_PATHS_HOME" && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd -r -g $XF_GID xformation && \
    useradd -r -u $XF_UID -g xformation xformation && \
    mkdir -p "$XF_PATHS_PROVISIONING/datasources" \
             "$XF_PATHS_PROVISIONING/dashboards" \
             "$XF_PATHS_LOGS" \
             "$XF_PATHS_PLUGINS" \
             "$XF_PATHS_DATA" && \
    cp "$XF_PATHS_HOME/conf/defaults.ini" "$XF_PATHS_CONFIG" && \
    cp "$XF_PATHS_HOME/conf/ldap.toml" /etc/xformation/ldap.toml && \
    chown -R xformation:xformation "$XF_PATHS_HOME" "$XF_PATHS_DATA" "$XF_PATHS_HOME/.aws" "$XF_PATHS_LOGS" "$XF_PATHS_PLUGINS" && \
    chmod 777 "$XF_PATHS_DATA" "$XF_PATHS_HOME/.aws" "$XF_PATHS_LOGS" "$XF_PATHS_PLUGINS"

EXPOSE 3000

COPY ./setup-xformation-db.sh /setup-xformation-db.sh
COPY ./run.sh /run.sh
COPY ./launch.sh /launch.sh
RUN chmod 777 /setup-xformation-db.sh
RUN chmod 777 /run.sh
RUN chmod 777 /launch.sh
USER xformation
WORKDIR /
ENTRYPOINT [ "/launch.sh" ]