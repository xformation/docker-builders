FROM debian:stretch

ARG SDP_URL="https://s3.amazonaws.com/sdp-releases/sdp-latest.linux-x64.tar.gz"
ARG SDP_UID="472"
ARG SDP_GID="472"

ENV PATH=/usr/share/sdp/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    SDP_PATHS_CONFIG="/etc/sdp/sdp.ini" \
    SDP_PATHS_DATA="/var/lib/sdp" \
    SDP_PATHS_HOME="/usr/share/sdp" \
    SDP_PATHS_LOGS="/var/log/sdp" \
    SDP_PATHS_PLUGINS="/var/lib/sdp/plugins" \
    SDP_PATHS_PROVISIONING="/etc/sdp/provisioning"
RUN apt-get update && apt-get install -y postgresql-client 
RUN npm install -g json-server
RUN apt-get update && apt-get install -qq -y tar libfontconfig curl ca-certificates && \
    mkdir -p "$SDP_PATHS_HOME/.aws" && \
    curl "$SDP_URL" | tar SDPvz - --strip-components=1 -C "$SDP_PATHS_HOME" && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd -r -g $SDP_GID sdp && \
    useradd -r -u $SDP_UID -g sdp sdp && \
    mkdir -p "$SDP_PATHS_PROVISIONING/datasources" \
             "$SDP_PATHS_PROVISIONING/dashboards" \
             "$SDP_PATHS_LOGS" \
             "$SDP_PATHS_PLUGINS" \
             "$SDP_PATHS_DATA" && \
    cp "$SDP_PATHS_HOME/conf/defaults.ini" "$SDP_PATHS_CONFIG" && \
    cp "$SDP_PATHS_HOME/conf/ldap.toml" /etc/sdp/ldap.toml && \
    chown -R sdp:sdp "$SDP_PATHS_HOME" "$SDP_PATHS_DATA" "$SDP_PATHS_HOME/.aws" "$SDP_PATHS_LOGS" "$SDP_PATHS_PLUGINS" && \
    chmod 777 "$SDP_PATHS_DATA" "$SDP_PATHS_HOME/.aws" "$SDP_PATHS_LOGS" "$SDP_PATHS_PLUGINS"

EXPOSE 3000

COPY ./setup-sdp-db.sh /setup-sdp-db.sh
COPY ./start-simulator.sh /start-simulator.sh
COPY ./run.sh /run.sh
COPY ./launch.sh /launch.sh
RUN chmod 777 /setup-sdp-db.sh
RUN chmod 777 /start-simulator.sh
RUN chmod 777 /run.sh
RUN chmod 777 /launch.sh
USER sdp
WORKDIR /
ENTRYPOINT [ "/launch.sh" ]